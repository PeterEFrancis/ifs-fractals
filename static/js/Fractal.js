class Fractal {

  constructor(cartesian, tw) {

    this.cartesian = cartesian;

    this.tw;
    this.running_weights;

    this.max_number_of_points = 10000;

    this.set_TW(tw);
  }

  set_TW(tw) {

    if (tw.transformations.length == 0) {
      throw "[ERROR: Fractal.js] no transformations defined";
    }

    // check for non-contraction mappings
    var which_not_c_maps = this.which_are_not_contraction_mappings(tw.transformations);
    if (which_not_c_maps.length == 0) {
      this.tw = tw;
      // ^ the fractal object can edit the tw object you are giving
      // it (so for example, if you load a fractal with un-normalized weights,
      // this will normalize them.)
      const sum = this.tw.weights.reduce((a, b) => a + b, 0);

      // make weights
      if (tw.weights.length == 0 || sum == 0) {
        tw.weights = [];
        for (var i = 0; i < tw.transformations.length; i++) {
          tw.weights.push(1 / tw.transformations.length);
        }
      } else {
        // normalize weights
        for (var i = 0; i < this.tw.weights.length; i++) {
          this.tw.weights[i] = this.tw.weights[i] / sum;
        }
      }

      // set running weights
      this.running_weights = [0];
      for (var i = 0; i < this.tw.weights.length; i++) {
        this.running_weights.push(this.running_weights[i] + this.tw.weights[i]);
      }
      this.running_weights.shift();

      // this.plot();

    } else {
      throw "[ERROR: Fractal.js] the transformations provided (" + which_not_c_maps + ") do not form a contraction mapping";
    }
  }

  opNorm(T) {
    // get 2 x 2 matrix (classic theorem 1.10!)
    var M = [[0,0],[0,0]];
    var t_0 = T({x:0, y:0});
    var t_e1 = T({x:1, y:0});
    M[0][0] = t_e1.x - t_0.x;
    M[1][0] = t_e1.y - t_0.y;
    var t_e2 = T({x:0, y:1});
    M[0][1] = t_e2.x - t_0.x;
    M[1][1] = t_e2.y - t_0.y;
    M = mult(M, transpose(M));
    // return the square root of the largest eigenvalue
    return Math.sqrt(Math.max(...eigenvalues(M)));
  }

  which_are_not_contraction_mappings(transformations) {
    var which = [];
    for (var i = 0; i < transformations.length; i++) {
      if (this.opNorm(transformations[i]) >= 1) {
        which.push(i + 1) ;
      }
    }
    return which;
  }

  set_max_number_of_points(num) {
    if (isNaN(num) || num <= 0 || Math.round(num) != num) {
      throw "[ERROR: Fractal.js] number of points to plot must be a whole positive number";
    } else {
      this.max_number_of_points = num;

      // this.plot();

    }
  }

  get_transformation_number() {
    var r = Math.random();
    for (var i = 0; i < this.running_weights.length; i++) {
      if (r < this.running_weights[i]) {
        return i;
      }
    }
    throw "[ERROR: Fractal.js] error with choosing random transformation";
  }

  get_next_point(p) {
    return this.tw.transformations[this.get_transformation_number()](p);
  }

  plot() {
    this.cartesian.clear();
    // chaos game
    var p = {x: 1, y: 1};
    // first throw some starter points away so you start to converge
    for (var i = 0; i < 200; i++) {
      p = this.get_next_point(p);
    }
    // then start to plot
    for (var i = 0; i < this.max_number_of_points; i++) {
      p = this.get_next_point(p);
      this.cartesian.plot(p.x, p.y);
    }
  }

  error(msg) {
    this.cartesian.error(msg);
  }

  get_bounds() {
    var bounds = {
      lb_x: Infinity,
      lb_y: Infinity,
      ub_x: -Infinity,
      ub_y: -Infinity
    }
    var p = {x: 1, y: 1};
    // first throw some starter points away so you start to converge
    for (var i = 0; i < 200; i++) {
      p = this.get_next_point(p);
    }
    // then go throught a BUNCH
    for (var i = 0; i < 1000000; i++) {
      p = this.get_next_point(p);
      if (p.x > bounds.ub_x) bounds.ub_x = p.x;
      if (p.x < bounds.lb_x) bounds.lb_x = p.x;
      if (p.y > bounds.ub_y) bounds.ub_y = p.y;
      if (p.y < bounds.lb_y) bounds.lb_y = p.y;
    }
    return bounds;
  }

  count_dark_pixels() {
    var count = 0;
    const pixel_data = this.cartesian.ctx.getImageData(0, 0, this.cartesian.canvas.width, this.cartesian.canvas.height).data;
    for (var i = 0; i < pixel_data.length; i+= 4) {
      count = count + ((pixel_data[i] + pixel_data[i + 1] + pixel_data[i + 2] + pixel_data[i + 3]) > 0 ? 1 : 0);
    }
    return count;
  }

  calculate_box_dimension() {

    // Algorithm:
    //   - plot an ample amount of points of the fractal on a fine grid
    //   - count the number of pixels are dark (let this number be A)
    //   - plot again on a grid with twice the number of pixels in each direction (4 times total)
    //   - count the number of pixels again (let this number be B)
    //   - the dimension D of the fractal must satisfy B / A = 2 ^ D, so D = log_2(B/A)

    const canvas = document.createElement('canvas');
    canvas.width = 3000;
    canvas.height = 3000;

    const cart = new Cartesian(canvas);
    cart.save = false;
    const fract = new Fractal(cart, this.tw);

    cart.set_with_bounds(fract.get_bounds());

    fract.set_max_number_of_points(3000000); // auto plots
    const num_dark_2 = fract.count_dark_pixels();

    canvas.width = 1500;
    canvas.height = 1500;

    cart.set_with_bounds(fract.get_bounds());
    fract.plot();

    const num_dark_1 = fract.count_dark_pixels();

    return Math.log(num_dark_2/num_dark_1) / Math.log(2);
  }

  calculate_analytic_dimension(accuracy) {
    // find the scales s_i of each of the n pieces
    // if the scales are all the same, sue the direct formula
    // otherwise, solve \sum_{i=1}^n (s_i)^D = 1

    var n = this.tw.transformations.length;
    var scales = [];
    var all_same = true;
    var first = null;
    for (var i = 0; i < this.tw.transformations.length; i++) {
      const factored = factor_transformation(this.tw.transformations[i]);
      for (var j = 0; j < factored.length; j++) {
        if (factored[j].name.includes("Scale")) {
          var s_x = 1;
          var s_y = 1;
          if (factored[j].name == "Scale") {
            s_x = factored[j].args[0];
            s_y = s_x;
          } else if (factored[j].name == "XScale") {
            s_x = factored[j].args[0];
          } else if (factored[j].name == "YScale") {
            s_y = factored[j].args[0];
          } else if (factored[j].name == "XYScale") {
            s_x = factored[j].args[0];
            s_y = factored[j].args[1];
          }
          const s = Math.sqrt(Math.abs(s_x * s_y));
          if (all_same) {
            if (first == null) {
              first = s;
            } else if (Math.abs(first - s) > Math.pow(0.1, accuracy)) {
              all_same = false;
            }
          }
          scales.push(s);
        }
      }
    }

    if (all_same) {
      return "log(" + n + ")/log(" + (1 / scales[0]) + ") = " + round(Math.log(n)/Math.log(1 / scales[0]), accuracy);
    }


    function f(D) {
      var sum = 0;
      for (var i = 0; i < n; i++) {
        sum += Math.pow(scales[i], D);
      }
      return sum - 1;
    }

    return round(find_zero_binary(1, 10, f, Math.pow(0.1, accuracy)), 5);


  }

}
