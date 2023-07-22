
// matrix calculations for 2 x 2 matrices and 2 x 1 vectors

function trace(M) {
  return M[0][0] + M[1][1]
}

function det(M) {
  return M[0][0] * M[1][1] - M[0][1] * M[1][0];
}

function eigenvalues(M) {
  var t = trace(M);
  var d = det(M);
  var s = Math.sqrt(Math.pow(t, 2) - 4 * d);
  return [(t + s) / 2, (t - s) / 2];
}

function transpose(M) {
  return [[M[0][0], M[1][0]],
          [M[0][1], M[1][1]]]
}

function mult(A, B) {
  var M = [];
  for (var i = 0; i < A.length; i++) {
    M.push([]);
    for (var j = 0; j < B[0].length; j++) {
      var s = 0;
      for (var k = 0; k < A[0].length; k++) {
        s += A[i][k] * B[k][j];
      }
      M[i][j] = s;
    }
  }
  return M;
}


function matrix_from_transformation(t) {
  const t_e1 = t({x:1, y:0});
  const t_e2 = t({x:0, y:1});
  const t_e3 = t({x:0, y:0});
  return [
    [t_e1.x - t_e3.x, t_e2.x - t_e3.x, t_e3.x],
    [t_e1.y - t_e3.y, t_e2.y - t_e3.y, t_e3.y],
    [0, 0, 1]
  ];
}


function two_by_two(M) {
  M.pop();
  M[0].pop();
  M[1].pop();
  return M;
}


function get_angle(vec) {
  var angle = Math.atan(vec[1] / vec[0]);
  if (vec[0] < 0) {
    angle += Math.PI;
  }
  return (2 * Math.PI + angle) % (2 * Math.PI);
}



function round(el, dec) {
  if (typeof(el) == "object") {
    var out = [];
    for (var i in el) {
      out.push(round(el[i], dec));
    }
    return out;
  }
  return Math.round((el + Number.EPSILON) * (10 ** dec)) / (10 ** dec);
}


function find_zero_binary(x1, x2, f, accuracy) {
  if (f(x1) * f(x2) > 0) {
    throw "No solution garanteed";
  }
  function search(a, b) {
    const mid = (a + b) / 2;
    if (Math.abs(f(mid)) < accuracy) {
      return mid;
    }
    if (f(mid) * f(a) < 0) {
      b = mid;
    } else {
      a = mid;
    }
    return search(a,b);
  }

  return search(x1, x2);
}



function get_auto_distribute_weights(matrices, delta) {
  var maxs = [];
  for (var i = 0; i < matrices.length; i++) {
    maxs.push(Math.max(delta, Math.abs(det(two_by_two(matrices[i])))));
  }
  const s = maxs.reduce((a, b) => a + b, 0);
  var weights = [];
  for (var i = 0; i < maxs.length; i++) {
    weights.push(round(maxs[i] / s, 3));
  }
  return weights;
}






// PARSING


// requires mathjs


function replace_all(string, a, b) {
  while (string.includes(a)) {
    string = string.replace(a,b);
  }
  return string;
}

function parse(string, vals) {
  if (typeof(string) == 'number') {
    return string
  }
  string = replace_all(string, 'neg', '(-1)');
  string = replace_all(string, 'squareroot', 'sqrt');
  return Number(math.evaluate(string, vals));
}





// COLORS

const colors = [
  'C10020', // Vivid Red
  'FF6800', // Vivid Orange
  'FFB300', // Vivid Yellow
  '007D34', // Vivid Green
  '00538A', // Strong Blue
  '803E75', // Strong Purple
  'A6BDD7', // Very Light Blue
  'CEA262', // Grayish Yellow
  '817066', // Medium Gray
  'F6768E', // Strong Purplish Pink
  'FF7A5C', // Strong Yellowish Pink
  '53377A', // Strong Violet
  'FF8E00', // Vivid Orange Yellow
  'B32851', // Strong Purplish Red
  'F4C800', // Vivid Greenish Yellow
  '7F180D', // Strong Reddish Brown
  '93AA00', // Vivid Yellowish Green
  '593315', // Deep Yellowish Brown
  'F13A13', // Vivid Reddish Orange
  '232C16'  // Dark Olive Green
];

function color_function(i) {
  if (i < colors.length) {
    return colors[i];
  }
  return "000000";
}
