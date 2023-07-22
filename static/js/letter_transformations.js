

function is_alpha(string) {
  for (var i = 0; i < string.length; i++) {
    if (!"ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(string[i].toUpperCase())) {
      return false;
    }
  }
  return true;
}

function ones(n) {
  var out = [];
  for (var i = 0; i < n; i++) {
    out.push(1);
  }
  return out;
}


function get_word_tw(string) {
  if (!is_alpha(string)) {
    throw "[ERROR: letter_transformations.js] string must only contain letters";
  }
  if (string.length < 3) {
    throw "[ERROR: letter_transformations.js] string must be at least three letters long";
  } else {
    var transformations = [];
    const n = string.length;
    const gap = 1 / (n * n);
    const width = (1 - (n - 1) * gap) / n;
    for (var i = 0; i < n; i++) {
      letter_trans = letter_transformation(string[i], n);
      for (var t = 0; t < letter_trans.length; t++) {
        transformations.push(compose([Translate(i * (width + gap), 0), XYScale(width, 1 / n), letter_trans[t]]));
      }
    }
    return {
      transformations: transformations,
      weights: ones(transformations.length)
    };
  }
}




function letter_transformation(letter, n) {

  // for Q
  const theta = Math.atan(1 - 2/n);
  const z = (1/2 - 1/n - Math.sin(theta) / n) * Math.cos(theta);
  const x = 1/2 - z * Math.sin(theta) - Math.cos(theta)/n;
  const y = x * Math.tan(theta);

  return {
    A: [
      compose([YShear((1-1/n)*2), XScale(1/2)]),
      compose([Translate(1/2, 1-1/n), YShear((1/n-1)*2), XScale(1/2)]),
      compose([Translate(n/(4*(n-1)),1/2-1/n), XScale(1 - n/(2*(n-1)))])
    ],
    B: [
      compose([Translate(0,1), Rotate(-Math.PI/2)]),
      compose([Translate(1/n, 1-1/(2*n)), XYScale(1/2 - 1/(2*n),1/2)]),
      compose([Translate(1/2 + 1/(2*n), 1/2+1/(4*n)), Rotate(Math.PI/2), XYScale(1/2 - 3/(4*n),1/2)]),
      compose([Translate(1/n,1/2 - 1/(4*n)), XYScale(1-2/n, 1/2)]),
      compose([Translate(1-1/n, 1/2+1/(4*n)), Rotate(-Math.PI/2), XScale(1/2 - 3/(4*n))]),
      compose([Translate(1/n,0), XScale(1 - 1/n)]),
    ],
    C: [
      compose([Translate(1/n,0), XScale(1-1/n)]),
      compose([Translate(1/n,0), Rotate(Math.PI/2)]),
      compose([Translate((1/n),1-1/n), XScale(1-1/n)])
    ],
    D: [
      compose([Translate(0,1), Rotate(-Math.PI/2)]),
      compose([Translate(1/n,1-1/n), YShear(-1/2), XScale(1-2/n)]),
      compose([Translate(1-1/n, 1/2+1/n), Rotate(-Math.PI/2), XScale(1/2+1/n)]),
      compose([Translate(1/n,0), XScale(1-2/n)])
    ],
    E: [
      compose([Translate(0,1), Rotate(-Math.PI/2)]),
      compose([Translate(1/n,1-1/n), XScale(1-1/n)]),
      compose([Translate(1/n,1/2-1/(4*n)), XYScale(1-2/n,1/2)]),
      compose([Translate(1/n,0), XScale(1-1/n)])
    ],
    F: [
      compose([Translate(0,1), Rotate(-Math.PI/2)]),
      compose([Translate(1/n,1-1/n), XScale(1-1/n)]),
      compose([Translate(1/n,1/2-1/(4*n)), XYScale(1-2/n,1/2)])
    ],
    G: [
      compose([Translate(1/n,0), XScale(1-1/n)]),
      compose([Translate(1/n,0), Rotate(Math.PI/2)]),
      compose([Translate((1/n),1-1/n), XScale(1-1/n)]),
      compose([Translate(1-1/n,1/2), Rotate(-Math.PI/2), XScale(1/2 - 1/n)]),
      compose([Translate(1-1/n-1/4,1/2 - 1/(2*n)), XYScale(1/4,1/2)])
    ],
    H: [
      compose([Translate(1/n,0), Rotate(Math.PI/2)]),
      compose([Translate(1,0), Rotate(Math.PI/2)]),
      compose([Translate(1/n,1/2-1/(2*n)), XScale(1-2/n)])
    ],
    I: [
      compose([Translate(0,1-1/n)]),
      compose([Translate(1/2 - 1/(2*n),1-1/n), Rotate(-Math.PI/2), XScale(1-2/n)]),
      compose([Scale(1)])
    ],
    J: [
      compose([Translate(0,1-1/n)]),
      compose([Translate(1/2 - 1/(2*n),1-1/n), Rotate(-Math.PI/2), XScale(1-2/n)]),
      compose([XScale(1/2 + 1/(2*n))])
    ],
    K: [
      compose([Translate(0,1), Rotate(-Math.PI/2)]),
      compose([Translate(1/n,1/2), YShear((n/2 - 1)/(n-1)), XScale(1-1/n)]),
      compose([Translate(1/n,1/2-1/n), YShear((1 - n/2)/(n-1)), XScale(1-1/n)])
    ],
    L: [
      compose([Translate(0,1), Rotate(-Math.PI/2)]),
      compose([Translate(1/n,0), XScale(1-1/n)])
    ],
    M: [
      compose([Translate(0,1), Rotate(-Math.PI/2)]),
      compose([Translate(1/n,1-1/n), YShear(-1), XScale(1/2 - 1/n)]),
      compose([Translate(1/2,1/2), YShear(1), XScale(1/2 - 1/n)]),
      compose([Translate(1-1/n,1), Rotate(-Math.PI/2)])
    ],
    N: [
      compose([Translate(0,1), Rotate(-Math.PI/2)]),
      compose([Translate(1/n,1-1/n), YShear((1/n-1)/(1-2/n)), XScale(1 - 2/n)]),
      compose([Translate(1-1/n,1), Rotate(-Math.PI/2)])
    ],
    O: [
      compose([Translate(1/n,0), XScale(1-2/n)]),
      compose([Translate(1,0), Rotate(Math.PI/2)]),
      compose([Translate(1/n,1-1/n), XScale(1-2/n)]),
      compose([Translate(1/n,0), Rotate(Math.PI/2)])
    ],
    P: [
      compose([Translate(0,1), Rotate(-Math.PI/2)]),
      compose([Translate(1/n, 1-3/(4*n)), XYScale(1-2/n,3/4)]),
      compose([Translate(1-1/n, 1), Rotate(-Math.PI/2), XScale(1/2)]),
      compose([Translate(1/n, 1/2), XYScale(1-2/n,3/4)])
    ],
    Q: [
      compose([Translate(0,1/2), YShear(1-2/n), XScale(1/2)]),
      compose([Translate(0,1/2-1/n), YShear(2/n-1), XScale(1/2)]),
      compose([Translate(1/2,0), YShear(1-2/n), XScale(1/2)]),
      compose([Translate(1/2,1-1/n), YShear(2/n-1), XScale(1/2)]),
      compose([Translate(1/2 + x,y), Rotate(theta-Math.PI/2), XYScale(z,1/2)])
    ],
    R: [
      compose([Translate(0,1), Rotate(-Math.PI/2)]),
      compose([Translate(1/n, 1-3/(4*n)), XYScale(1-2/n,3/4)]),
      compose([Translate(1-1/n, 1), Rotate(-Math.PI/2), XScale(1/2)]),
      compose([Translate(1/n, 1/2), XYScale(1-2/n,3/4)]),
      compose([Translate(1/n,1/2-1/n), YShear((1/n-1/2)/(1-1/n)), XScale(1-1/n)])
    ],
    S: [
      compose([XScale(1-1/n)]),
      compose([Translate(1,0), Rotate(Math.PI/2), XScale(1/2-1/(2*n))]),
      compose([Translate(1/n,1/2-1/(2*n)), XScale(1-1/n)]),
      compose([Translate(1/n,1/2-1/(2*n)), YScale(1/2-1/(2*n)), Rotate(Math.PI/2)]),
      compose([Translate(0,1-1/n)])
    ],
    T: [
      compose([Translate(0,1-1/n)]),
      compose([Translate(1/2 - 1/(2*n),1-1/n), Rotate(-Math.PI/2), XScale(1-1/n)])
    ],
    U: [
      compose([Scale(1)]),
      compose([Translate(0,1), Rotate(-Math.PI/2), XScale(1-1/n)]),
      compose([Translate(1-1/n,1), Rotate(-Math.PI/2), XScale(1-1/n)])
    ],
    V: [
      compose([Translate(0,1-1/n), YShear(2/n-2), XScale(1/2)]),
      compose([Translate(1/2,0), YShear(2-2/n), XScale(1/2)])
    ],
    W: [
      compose([Translate(0,1), Rotate(-Math.PI/2)]),
      compose([Translate(1/n,0), YShear(1), XScale(1/2 - 1/n)]),
      compose([Translate(1/2,1/2-1/n), YShear(-1), XScale(1/2 - 1/n)]),
      compose([Translate(1-1/n,1), Rotate(-Math.PI/2)])
    ],
    X: [
      compose([Translate(Math.cos(Math.PI/4)/n,0), Rotate(Math.PI/4), XScale(Math.sqrt(2)-1/n)]),
      compose([Translate(0,1-Math.cos(Math.PI/4)/n), Rotate(-Math.PI/4), XScale(Math.cos(Math.PI/4) - 1/n)]),
      compose([Translate(1/2,1/2-Math.cos(Math.PI/4)/n), Rotate(-Math.PI/4), XScale(Math.cos(Math.PI/4) - 1/n)])
    ],
    Y: [
      compose([Translate(1/2-1/(2*n),1/2), Rotate(-Math.PI/2), XScale(1/2)]),
      compose([Translate(0,1-1/n), YShear((1/2)/(1/(2*n) - 1/2)), XScale(1/2 - 1/(2*n))]),
      compose([Translate(1/2 + 1/(2*n),1/2 - 1/n), YShear((1/2)/(1/2 - 1/(2*n))), XScale(1/2 - 1/(2*n))])
    ],
    Z: [
      compose([Translate(0,1-1/n)]),
      compose([Translate(1/n,1/n), Rotate(Math.PI/2), YShear(1/(1/n-1)), XScale(1-2/n)]),
      compose([Scale(1)])
    ]
  }[letter.toUpperCase()];
}
