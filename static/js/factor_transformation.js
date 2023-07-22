function factor_transformation(t) {

  // Rotation arguments are given as multiples of PI


  var transformations = [];

  // get the translation
  var t_e3 = t({x:0, y:0});
  if (t_e3.x != 0 || t_e3.y != 0) {
    transformations.push({name:'Translate', args:[t_e3.x, t_e3.y]});
  }

  // get 2 x 2 matrix
  const M = two_by_two(matrix_from_transformation(t));

  const a = M[0][0];
  const b = M[0][1];
  const c = M[1][0];
  const d = M[1][1];
  const determinant = det(M);
  const s = Math.sqrt(a*a + c*c);


  const EPSILON = 1 / (10 ** 5);

  // if M is not invertible
  if (determinant == 0) {
    // // if col1 = 0
    // if (Math.abs(a) < EPSILON && Math.abs(c) < EPSILON) {
    //   // if col2 == 0
    //   if (Math.abs(b) < EPSILON && Math.abs(d) < EPSILON) {
    //     transformations.push({name:'Scale', args:[0]});
    //   } else {
    //     if (Math.abs(d) < EPSILON) {
    //       transformations.push({name:'Rotate', args:[- 1 / 2]});
    //       transformations.push({name:'XYScale', args:[0, b]});
    //     } else {
    //       if (Math.abs(b) > EPSILON) {
    //         transformations.push({name:'XShear', args:[b / d]});
    //       }
    //       transformations.push({name:'XYScale', args:[0, d]});
    //     }
    //   }
    // } else if (Math.abs(b) < EPSILON && Math.abs(d) < EPSILON) { // if col2 = 0
    //   if (Math.abs(a) < EPSILON) {
    //     transformations.push({name:'Rotate', args:[1 / 2]});
    //     transformations.push({name:'XYScale', args:[c, 0]});
    //   } else {
    //     if (Math.abs(c) > EPSILON) {
    //       transformations.push({name:'YShear', args:[c/a]});
    //     }
    //     transformations.push({name:'XYScale', args:[a, 0]});
    //   }
    // } else {
    //   var theta = get_angle([a, c]);
    //   if (Math.abs(theta) < EPSILON) {
    //     transformations.push({name:'Rotate', args:[theta / Math.PI]});
    //     transformations.push({name:'XYScale', args:[s, 0]});
    //   } else {
    //     transformations.push({name:'XYScale', args:[a, 0]});
    //   }
    //   transformations.push({name:'XShear', args:[b / a]});
    // }


    // NEWER VERSION
    var mag1 = Math.sqrt(a*a + c*c);
    var mag2 = Math.sqrt(b*b + d*d);

    // if col1 =/= 0
    if (mag1 != 0) {
      var theta = get_angle([a,c]) / Math.PI;
      if (Math.abs(theta) > EPSILON) {
        transformations.push({name:'Rotate', args:[theta]});
      }
      if (math.abs(1 - mag1) > EPSILON) {
        transformations.push({name:'XYScale', args:[mag1, 0]});
      } else {
        transformations.push({name:'YScale', args:[0]});
      }
      if (mag2 / mag1 > EPSILON) {
        transformations.push({name:'XShear', args:[mag2 / mag1]});
      }
    } else if (mag2 != 0) { // if col2 =/= 0
        var theta = ((Math.PI / 2) - get_angle([b,d])) / Math.PI;
        if (Math.abs(theta) > EPSILON) {
          transformations.push({name:'Rotate', args:[theta]});
        }
        if (math.abs(1 - mag2) > EPSILON) {
          transformations.push({name:'XYScale', args:[0, mag2]});
        } else {
          transformations.push({name:'XScale', args:[0]});
        }
    } else {
      transformations.push({name:'Scale', args:[0]});
    }




  } else {
    var angle = get_angle([M[0][0], M[1][0]]);
    if (angle > EPSILON) {
      transformations.push({name:'Rotate', args:[angle / Math.PI]});
    }
    if (Math.abs((a*b+c*d) / determinant) > EPSILON) {
      transformations.push({name:'XShear', args:[(a*b+c*d) / determinant]});
    }
    if (Math.abs(s - 1) > EPSILON) {
      if (Math.abs(determinant / s - 1) > EPSILON) {
        if (Math.abs(s - (determinant / s)) < EPSILON) {
          transformations.push({name:'Scale', args:[s]});
        } else {
          transformations.push({name:'XYScale', args:[s, determinant / s]});
        }
      } else {
        transformations.push({name:'XScale', args:[s]});
      }
    } else if (Math.abs(determinant / s - 1) < EPSILON) {
      transformations.push({name:'YScale', args:[determinant / s]});
    }
  }

  return transformations;
}
