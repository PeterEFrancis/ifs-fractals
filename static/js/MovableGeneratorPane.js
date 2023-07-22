
function get_matrix_from_block(block) {
  return [
    [block.e1.x, block.e2.x, block.o.x],
    [block.e1.y, block.e2.y, block.o.y],
    [0, 0, 1],
  ];
}

function contains_point(block, point) {
  let p = {
    x: point.x - block.o.x,
    y: point.y - block.o.y
  }
  let t_e1 = {
    x: block.e1.x,
    y: block.e1.y
  };
  let t_e2 = {
    x: block.e2.x,
    y: block.e2.y
  };

  let det = t_e1.x * t_e2.y - t_e2.x * t_e1.y;
  let mu = (1 / det) * (p.x * t_e2.y - p.y * t_e2.x);
  let lambda = (1 / det) * (p.y * t_e1.x - p.x * t_e1.y);
  if (0 < mu && mu < 1 && 0 < lambda && lambda < 1) {
    return true;
  }
  return false;
}

function dist(p1, p2) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}


class MovableGeneratorPane {

  constructor(canvas, cf) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.color_function = cf || color_function;
    this.set_color("black");
    this.zoom = 600; // image / real
    this.save = true;
    this.on_zoom_change = function() {};
    this.on_move = function() {};
    this.center = {x:1/2, y:1/2};
    this.blocks = [
      {o:{x:0,y:0}, e1:{x:1/2,y:0}, e2:{x:0,y:1/2}},
      {o:{x:1/2,y:0}, e1:{x:1/2,y:0}, e2:{x:0,y:1/2}},
      {o:{x:1/4,y:1/2}, e1:{x:1/2,y:0}, e2:{x:0,y:1/2}}
    ];
    this.block_order = [0, 1, 2];
    this.clear();

    this.hover = {x: null, y: null};
    this.mousedown = false;
    this.mousedown_loc = {};
    this.selected_block = null;
    this.holding = null;

    const movegen = this;

    this.curTxt = document.createElement('div');
    this.curTxt.id = "cursorText";
    document.body.appendChild(this.curTxt);





    // this.canvas.addEventListener('click', function(e) {
    //   e.preventDefault();
    //   let user = movegen.event_int(e);
      
    //   movegen.selected_block = movegen.cursor_block(user);

    // })



    this.canvas.addEventListener('mousedown', function(e) {

      e.preventDefault();
      let user = movegen.event_int(e);
      let rp = movegen.get_real_point(user);

      let block_id = movegen.cursor_block(user);

      movegen.mousedown = true;
      movegen.mousedown_loc = movegen.get_real_point(user.x, user.y);

      // if clicked a block
      if (block_id != null) {

        // set holding
        let block = movegen.blocks[block_id];
        let copy = JSON.parse(JSON.stringify(block));
        if (dist(user, movegen.get_plot_point(block.o.x + block.e1.x, block.o.y + block.e1.y)) < 30) {
          movegen.holding = {attr: 'e1_len', id: block_id, 'cursor': 'all-scroll', 'copy': copy};
        } else if (dist(user, movegen.get_plot_point(block.o.x + block.e2.x, block.o.y + block.e2.y)) < 30) {
          movegen.holding = {attr: 'e2_len', id: block_id, 'cursor': 'all-scroll', 'copy': copy};
        } else {
          movegen.holding = {attr: 'loc', id: block_id, 'cursor': 'grabbing', 'copy': copy};
        }
        // set selected
        movegen.selected_block = block_id;
        movegen.block_order.splice(movegen.block_order.indexOf(block_id), 1);
        movegen.block_order.push(block_id);

      } else {
        movegen.selected_block = null;
      }

    });


    this.canvas.addEventListener('mousemove', function(e) {
      e.preventDefault();
      let user = movegen.event_int(e);
      let rp = movegen.get_real_point(user.x, user.y);

      // update hover location
      movegen.hover = movegen.get_real_point(user.x, user.y);
      let depth = Math.pow(10, Math.round(Math.log(movegen.zoom) / Math.log(10)) - 1);
      movegen.curTxt.innerHTML = "(" + (Math.round(movegen.hover.x * depth) / depth) + ", " + (Math.round(movegen.hover.y * depth) / depth) + ")";
      movegen.curTxt.style.left = (event.pageX + 10) + "px";
      movegen.curTxt.style.top = event.pageY + "px";

      if (movegen.mousedown) {
        if (movegen.holding) {
          let copy = movegen.holding.copy;
          let block = movegen.blocks[movegen.holding.id];
          document.body.style.cursor = movegen.holding.cursor;
          if (movegen.holding.attr == "loc") {
            block.o = {
              x: copy.o.x + (rp.x - movegen.mousedown_loc.x),
              y: copy.o.y + (rp.y - movegen.mousedown_loc.y)
            }
          } else if (movegen.holding.attr == "e1_len") {
            block.e1 = {
              x: copy.e1.x + (rp.x - movegen.mousedown_loc.x),
              y: copy.e1.y + (rp.y - movegen.mousedown_loc.y)
            }
          } else if (movegen.holding.attr == "e2_len") {
            block.e2 = {
              x: copy.e2.x + (rp.x - movegen.mousedown_loc.x),
              y: copy.e2.y + (rp.y - movegen.mousedown_loc.y)
            }
          }
        } else {
          movegen.center_at({
            x: movegen.center.x - (rp.x - movegen.mousedown_loc.x),
            y: movegen.center.y - (rp.y - movegen.mousedown_loc.y)
          });
        }
      } 
      // else if (movegen.cursor_block(user) == movegen.selected_block) {
      //   document.body.style.cursor = "grab";
      // } else {
      //   document.body.style.cursor = "auto";
      // }



    });


    this.canvas.addEventListener('mouseup', function(e) {
      movegen.mousedown = false;
      movegen.mousedown_loc = null;
      movegen.holding = null;
      document.body.style.cursor = "auto";
    });


    this.canvas.addEventListener('mouseout', function(e) {
      movegen.hover = {x:null, y:null};
      movegen.mousedown = false;
      movegen.curTxt.innerHTML = "";
      movegen.holding = null;
      document.body.style.cursor = "auto";
    });


    this.canvas.addEventListener('dblclick', function(e) {
      e.preventDefault();
      let user = movegen.event_int(e);
      let rp = movegen.get_real_point(user.x, user.y);
      
      let clicked_now = movegen.cursor_block(user);

      if (clicked_now != null) {
        movegen.delete_block(clicked_now);      
      } else {
        movegen.add_block(rp);
      }

    });


    this.canvas.addEventListener('wheel', function(e) {
      e.preventDefault();
      movegen.zoom_to(movegen.zoom * (10 ** (e.deltaY / 500)));
      movegen.redraw();
    });


    setInterval(function() {
      movegen.redraw();
    }, 100);


  }


  event_int(e) {
    var rect = this.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (this.canvas.width / this.canvas.clientWidth),
      y: (e.clientY - rect.top) * (this.canvas.height / this.canvas.clientHeight)
    };
  }

  cursor_block(user) {
    let block_id = null;
    // check if clicked a block
    for (let i = this.block_order.length - 1; i >=0; i--) {
      if (contains_point(this.blocks[this.block_order[i]], this.get_real_point(user.x, user.y))) {
        block_id = this.block_order[i];
        break;
      }
    }
    return block_id;
  }

  get_matrices() {
    return this.blocks.map(x => get_matrix_from_block(x));
  }

  get_TW() {
    let matrices = this.get_matrices()
    return {
      transformations: matrices.map(x => matrix_to_transformation(x)),
      weights: get_auto_distribute_weights(matrices, 0.01),
    }
  }

  draw_origin() {
    this.ctx.strokeStyle = "black";
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
  }

  redraw() {
    this.clear();

    // draw origin
    // this.draw_origin()

    // draw home block
    this.draw({o:{x:0, y:0}, e1:{x:1, y:0}, e2:{x:0, y:1}}, "grey", false);

    // draw other blocks
    for (var i = 0; i < this.block_order.length; i++) {
      this.draw(this.blocks[this.block_order[i]], '#' + this.color_function(i), true, this.block_order[i] == this.selected_block);
    }
    
  }

  set_color(color) {
    this.ctx.fillStyle = color;
    if (this.blocks) {
      this.redraw();
    }
  }

  center_at(xy) {
    this.center = xy;
    this.redraw();
  }

  zoom_to(z) {
    if (z > 10 && z < 10000) {
      this.zoom = z;
      this.redraw();
      this.on_zoom_change();
    }
  }

  draw(block, color, fill, selected) {

    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
    
    let canvas_o = this.get_plot_point(block.o.x, block.o.y);
    let canvas_e1 = this.get_plot_point(block.o.x + block.e1.x, block.o.y + block.e1.y);
    let canvas_c = this.get_plot_point(block.o.x + block.e1.x + block.e2.x, block.o.y + block.e1.y + block.e2.y)
    let canvas_e2 = this.get_plot_point(block.o.x + block.e2.x, block.o.y + block.e2.y);
    let canvas_L1 = this.get_plot_point(block.o.x + block.e1.x * (Math.sqrt(2) / 8) + block.e2.x * (Math.sqrt(2) / 8), block.o.y + block.e1.y * (Math.sqrt(2) / 8) + block.e2.y * (Math.sqrt(2) / 8));
    let canvas_L2 = this.get_plot_point(block.o.x + block.e1.x * (Math.sqrt(2) / 16) + block.e2.x * (Math.sqrt(2) * 3 / 16), block.o.y + block.e1.y * (Math.sqrt(2) / 16) + block.e2.y * (Math.sqrt(2) * 3 / 16));

    this.ctx.beginPath();
    this.ctx.moveTo(canvas_o.x, canvas_o.y);
    this.ctx.lineTo(canvas_e1.x, canvas_e1.y);
    this.ctx.lineTo(canvas_c.x, canvas_c.y);
    this.ctx.lineTo(canvas_e2.x, canvas_e2.y);
    this.ctx.lineTo(canvas_o.x, canvas_o.y);
    this.ctx.lineTo(canvas_L1.x, canvas_L1.y);
    this.ctx.lineTo(canvas_L2.x, canvas_L2.y);

    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    if (fill) {
      this.ctx.globalAlpha = 0.5;
      this.ctx.fill();
    }

    if (selected) {
      this.ctx.lineWidth = 5;
      // this.ctx.strokeStyle = "black";
      this.ctx.stroke();

      // // e1
      // this.ctx.beginPath();
      // this.ctx.arc(canvas_e1.x, canvas_e1.y, 30, 0, 2 * Math.PI); // Math.atan(canvas_e1.y / canvas_e1.x), (3 / 2) * Math.PI);
      // this.ctx.fill();

      // // e2
      // this.ctx.beginPath();
      // this.ctx.arc(canvas_e2.x, canvas_e2.y, 30, 0, 2 * Math.PI); // Math.atan(canvas_e1.y / canvas_e1.x), (3 / 2) * Math.PI);
      // this.ctx.fill();


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


  add_block(loc) {
    this.blocks.push({
      o: loc,
      e1: {x: 1/2, y:0},
      e2: {x: 0, y: 1/2}
    });
    this.block_order.push(this.block_order.length);
  }

  delete_block(block_id) {
    this.blocks = [...this.blocks.slice(0, block_id), ...this.blocks.slice(block_id + 1)]
    
    let new_order = [];
    for (let i = 0; i < this.block_order.length; i++) {
      if (this.block_order[i] != block_id) {
        if (block_id < this.block_order[i]) {
          new_order.push(this.block_order[i] - 1);
        } else {
          new_order.push(this.block_order[i]);
        }
      }      
    }
    this.block_order = new_order;

    // this.block_order.splice(this.block_order.indexOf(block_id), 1);
  }

  download() {
    var link = document.createElement('a');
    link.download = 'ifs-fractals.png';
    link.href = this.canvas.toDataURL();
    link.click();
  }

}

