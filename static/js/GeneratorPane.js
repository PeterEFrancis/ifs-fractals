class GeneratorPane {
  
  constructor(canvas, cf) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.color_function = cf || color_function;
  }


  get_canvas_point(p) {
    return {
      x: (p.x - this.min.x) * this.zoom,
      y: (this.max.y - p.y) * this.zoom
    }
  }


  plot_box(box, color) {
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    var start = this.get_canvas_point(box[0]);
    this.ctx.moveTo(start.x, start.y);
    for (var i = 1; i < box.length; i++) {
      var next = this.get_canvas_point(box[i]);
      this.ctx.lineTo(next.x, next.y);
    }
    this.ctx.globalAlpha = 1;
    this.ctx.stroke();
  }


  fill_box(box, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    var start = this.get_canvas_point(box[0]);
    this.ctx.moveTo(start.x, start.y);
    for (var i = 1; i < 4; i++) {
      var next = this.get_canvas_point(box[i]);
      this.ctx.lineTo(next.x, next.y);
    }
    this.ctx.globalAlpha = 0.5;
    this.ctx.fill();
  }


  update(tw, ids) {
    // 1. find the corner points (and L) for each box that will be drawn
    // 2. use the corner points to figure the bounds (with 1.2 padding)
    // 3. convert the corner points to canvas coordinates
    // 4. plot gridlines
    // 5. plot lines connecting the corners

    const identity = [
      {x:0, y:0},
      {x:1, y:0},
      {x:1, y:1},
      {x:0, y:1},
      {x:0, y:0},
      {x:Math.sqrt(2) / 8, y:Math.sqrt(2) / 8},
      {x:Math.sqrt(2) / 16, y:Math.sqrt(2) * 3 / 16}
    ];

    this.max = {x:1, y:1};
    this.min = {x:0, y:0};

    var transformed_boxes = [];
    for (var i = 0; i < tw.transformations.length; i++) {
      var transformed_box = [];
      for (var j = 0; j < identity.length; j++) {
        const new_point = tw.transformations[i](identity[j]);
        transformed_box.push(new_point);
        if (new_point.x < this.min.x) {
          this.min.x = new_point.x;
        }
        if (new_point.x > this.max.x) {
          this.max.x = new_point.x;
        }
        if (new_point.y < this.min.y) {
          this.min.y = new_point.y;
        }
        if (new_point.y > this.max.y) {
          this.max.y = new_point.y;
        }
      }
      transformed_boxes.push(transformed_box);
    }

    const diff_x = this.max.x - this.min.x;
    const diff_y = this.max.y - this.min.y;
    const size = Math.max(diff_x, diff_y) * 1.2;
    this.min = {
      x: this.min.x - ((size - diff_x) / 2),
      y: this.min.y - ((size - diff_y) / 2),
    };
    this.max = {
      x: this.max.x + ((size - diff_x) / 2),
      y: this.max.y + ((size - diff_y) / 2),
    };

    this.zoom = this.canvas.width / (size);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    var origin = this.get_canvas_point({x:0, y:0});
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(origin.x - 5, origin.y - 5, 10, 10);

    this.plot_box(identity, "grey");

    for (var i = 0; i < transformed_boxes.length; i++) {
      this.plot_box(transformed_boxes[i], "black");
      this.fill_box(transformed_boxes[i], '#' + this.color_function(ids[i]));
    }


  }

}
