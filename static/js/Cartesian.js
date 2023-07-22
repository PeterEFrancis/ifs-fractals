
class Cartesian {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.set_color("black");
    this.zoom = 50; // image / real
    this.save = true;
    this.on_zoom_change = function() {};
    this.center = {x:0, y:0};
    this.points = [];
    this.clear();
    this.hover = {x: null, y: null};
    this.mousedown = false;
    this.mousedown_loc = {};


    const cart = this;

    this.curTxt = document.createElement('div');
    this.curTxt.id = "cursorText";
    document.body.appendChild(this.curTxt);

    this.canvas.onmousedown = function(e) {
      cart.mousedown = true;
      var rect = canvas.getBoundingClientRect();
      var user_x = (e.clientX - rect.left) * (cart.canvas.width / cart.canvas.clientWidth);
      var user_y = (e.clientY - rect.top) * (cart.canvas.height / cart.canvas.clientHeight);
      cart.mousedown_loc = cart.get_real_point(user_x, user_y);
    }
    this.canvas.addEventListener('mousedown', this.canvas.onmousedown);
    this.canvas.onmouseup = function(e) {
      cart.mousedown = false;
    }
    this.canvas.addEventListener('mouseup', this.canvas.onmouseup);
    this.canvas.onmouseout = function(e) {
      cart.hover = {x:null, y:null};
      cart.mousedown = false;
      cart.curTxt.innerHTML = "";
    }
    this.canvas.addEventListener('mouseout', this.canvas.onmouseout);
    this.canvas.onmousemove = function(e) {
      var rect = canvas.getBoundingClientRect();
      var user_x = (e.clientX - rect.left) * (cart.canvas.width / cart.canvas.clientWidth);
      var user_y = (e.clientY - rect.top) * (cart.canvas.height / cart.canvas.clientHeight);
      if (cart.mousedown) {
        var rp = cart.get_real_point(user_x, user_y);
        cart.center_at({
          x:cart.center.x - (rp.x - cart.mousedown_loc.x),
          y:cart.center.y - (rp.y - cart.mousedown_loc.y)
        });
      } else {
        cart.hover = cart.get_real_point(user_x, user_y);
      }
      // hover point
      let depth = Math.pow(10, Math.round(Math.log(cart.zoom) / Math.log(10)) - 1);
      cart.curTxt.innerHTML = "(" + (Math.round(cart.hover.x * depth) / depth) + ", " + (Math.round(cart.hover.y * depth) / depth) + ")";
      cart.curTxt.style.left = (event.pageX + 10) + "px";
      cart.curTxt.style.top = event.pageY + "px";

    }
    this.canvas.addEventListener('mousemove', this.canvas.onmousemove);
    this.canvas.ondblclick = function(e) {
      // recenter
      var rect = canvas.getBoundingClientRect();
      var user_x = (e.clientX - rect.left) * (cart.canvas.width / cart.canvas.clientWidth);
      var user_y = (e.clientY - rect.top) * (cart.canvas.height / cart.canvas.clientHeight);
      const clicked_point = cart.get_real_point(user_x, user_y);
      cart.center_at({
        x: clicked_point.x + (cart.center.x - clicked_point.x) / 2,
        y: clicked_point.y + (cart.center.y - clicked_point.y) / 2
      });
      // zoom 2x
      cart.zoom_to(cart.zoom * 2);
    };
    this.canvas.addEventListener('dblclick', this.canvas.ondblclick);
    this.canvas.oncontextmenu = function(e) {
      e.preventDefault();
      var rect = canvas.getBoundingClientRect();
      var user_x = (e.clientX - rect.left) * (cart.canvas.width / cart.canvas.clientWidth);
      var user_y = (e.clientY - rect.top) * (cart.canvas.height / cart.canvas.clientHeight);
      const clicked_point = cart.get_real_point(user_x, user_y);
      cart.center_at({
        x: clicked_point.x + (cart.center.x - clicked_point.x) * 2,
        y: clicked_point.y + (cart.center.y - clicked_point.y) * 2
      });
      cart.zoom_to(cart.zoom / 2);
    }
    this.canvas.addEventListener('contextmenu', this.canvas.oncontextmenu);
  }

  draw_origin() {
    var o = this.get_plot_point(0,0);
    const len = 50;
    this.ctx.lineWidth = "1";
    this.ctx.beginPath();
    this.ctx.arc(o.x, o.y, 10, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.moveTo(o.x,o.y + len);
    this.ctx.lineTo(o.x,o.y - len);
    this.ctx.stroke();
    this.ctx.moveTo(o.x + len, o.y);
    this.ctx.lineTo(o.x - len, o.y);
    this.ctx.stroke();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.points = [];
  }

  redraw_points() {
    var points = [...this.points];
    this.clear();
    for (var i = 0; i < points.length; i++) {
      this.plot(points[i][0], points[i][1]);
    }
  }

  set_color(color) {
    this.ctx.fillStyle = color;
    if (this.points) {
      this.redraw_points();
    }
  }

  center_at(xy) {
    this.center = xy;
    this.redraw_points();
  }

  zoom_to(z) {
    this.zoom = z;
    this.redraw_points();
    this.on_zoom_change();
  }

  plot(realX, realY) {
    var plot_point = this.get_plot_point(realX, realY);
    this.ctx.fillRect(plot_point.x, plot_point.y, 1, 1);
    if (this.save) {
      this.points.push([realX, realY]);
    }
  }

  get_plot_point(realX, realY) {
    var x = this.canvas.width / 2 + (realX - this.center.x) * this.zoom;
    var y = this.canvas.height / 2 - (realY - this.center.y) * this.zoom;
    return {x:x, y:y};
  }

  get_real_point(x, y) {
    var realX = (x - this.canvas.width / 2) / this.zoom + this.center.x;
    var realY = (this.canvas.height / 2 - y) / this.zoom + this.center.y;
    return {x: realX, y:realY}
  }

  recenter() {
    this.zoom_to(50);
    this.center_at({x:0,y:0});
  }


  get_auto_center_and_zoom(bounds, padding) {
    // zoom out and center, so all of the bounds are included, with an optional padding

    // center at center of bounds
    const new_center = {
      x: (bounds.ub_x + bounds.lb_x) / 2,
      y: (bounds.ub_y + bounds.lb_y) / 2
    };

    // look through distances from center to bounds (plus possible padding)
    var effective_bounds = {};
    for (var b in bounds) {
      effective_bounds[b] = bounds[b] + (padding && isNaN(padding) ? padding[b] : 0);
    }
    var new_zoom = Infinity;
    for (var v in effective_bounds) {
      const this_zoom = ((v[3] == "x" ? this.canvas.width : this.canvas.height) / 2) / Math.abs(effective_bounds[v] - new_center[v[3]]);
      if (this_zoom < new_zoom) {
        new_zoom = this_zoom;
      }
    }
    if (padding && !isNaN(padding)) {
      // padding then specifies a zoom multiplier
      new_zoom = new_zoom * padding;
    }

    return {
      zoom: new_zoom,
      center: new_center
    }

  }

  set_with_bounds(bounds, padding) {
    const zc = this.get_auto_center_and_zoom(bounds, padding);
    this.zoom = zc.zoom;
    this.center = zc.center;
  }

  download() {
    var link = document.createElement('a');
    link.download = 'ifs-fractals.png';
    link.href = this.canvas.toDataURL();
    link.click();
  }

  error(msg) {
    console.log(msg);
    let temp = this.ctx.fillStyle;
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "white";
    let size = 50;
    this.ctx.font = size + "pt monospace";
    let words = msg.split(' ');
    let row = 1;
    let col = 0;
    for (let i = 0; i < words.length; i++) {
      if (col + words[i].length * size > this.canvas.width - 75) {
        row += 1;
        col = 0;
      }
      this.ctx.fillText(words[i], 20 + col, 20 + size * 1.5 * row);
      col += (words[i].length) * size;
    }
    this.ctx.fillStyle = temp;
  }


}
