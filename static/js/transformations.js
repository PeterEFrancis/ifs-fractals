

// https://guppy.js.org/site/api/guppy-js/2.0.0-rc.1/Guppy.html#.add_global_symbol
const SYMBOLS = {
  "Scale": {"output": {"latex":"\\text{Scale}\\left({$1}\\right)", "text":"Scale($1)"}, "attrs": { "type":"Scale", "group":"function"}},
  "XScale": {"output": {"latex":"\\text{XScale}\\left({$1}\\right)", "text":"XScale($1)"}, "attrs": { "type":"XScale", "group":"function"}},
  "YScale": {"output": {"latex":"\\text{YScale}\\left({$1}\\right)", "text":"YScale($1)"}, "attrs": { "type":"YScale", "group":"function"}},
  "XYScale": {"output": {"latex":"\\text{XYScale}\\left({$1}, {$2}\\right)", "text":"XYScale($1)"}, "attrs": { "type":"XYScale", "group":"function"}},
  "Translate": {"output": {"latex":"\\text{Translate}\\left({$1}, {$2}\\right)", "text":"Translate($1, $2)"}, "attrs": { "type":"Translate", "group":"function"}},
  "Rotate": {"output": {"latex":"\\text{Rotate}\\left({$1}\\right)", "text":"Rotate($1)"}, "attrs": { "type":"Rotate", "group":"function"}},
  "XShear": {"output": {"latex":"\\text{XShear}\\left({$1}\\right)", "text":"XShear($1)"}, "attrs": { "type":"XShear", "group":"function"}},
  "YShear": {"output": {"latex":"\\text{YShear}\\left({$1}\\right)", "text":"YShear($1)"}, "attrs": { "type":"YShear", "group":"function"}},
  "M": {"output": {"latex":"\\text{M}\\left({$1}, {$2}, {$3}, {$4}, {$5}, {$6}\\right)", "text":"M($1, $2, $3, $4, $5, $6)"}, "attrs": { "type":"M", "group":"function"}},
}



function Scale(s) {
  return function(p) {
    return {x: p.x * s,
            y: p.y * s};
  };
}

function XScale(s) {
  return function(p) {
    return {x: p.x * s,
            y: p.y};
  };
}

function YScale(s) {
  return function(p) {
    return {x: p.x,
            y: p.y * s};
  };
}

function XYScale(s,t) {
  return function(p) {
    return {x: p.x * s,
            y: p.y * t};
  };
}

function Translate(h,k) {
  return function(p) {
    return {x: p.x + h,
            y: p.y + k};
  };
}

function Rotate(theta) {
  return function(p) {
    return {x: p.x * Math.cos(theta) - p.y * Math.sin(theta),
            y: p.x * Math.sin(theta) + p.y * Math.cos(theta)};
  };
}

function XShear(t) {
  return function(p) {
    return {x: p.x + p.y * t,
            y: p.y};
  };
}

function YShear(t) {
  return function(p) {
    return {x: p.x,
            y: p.y + p.x * t};
  };
}

function M(a, b, c, d, f, g) {
  return function(p) {
    return {x: a * p.x + b * p.y + f,
            y: c * p.x + d * p.y + g};
  };
}

function compose(ts) {
  return function(p) {
    for (var i = 0; i < ts.length; i++) {
      p = ts[ts.length - 1 - i](p);
    }
    return p;
  }
}


function split_into_list(functions_string) {
  functions_string = functions_string.replaceAll(' ', "").replaceAll("\n","");

  if (functions_string[0] != "(") {
    // only one function
    return [functions_string];
  } else {
    var open_count = 0;
    var closed_count = 0;
    for (var i = 1; i < functions_string.length; i++) {
      if (functions_string[i] == '(') {
        open_count++;
      } else if (functions_string[i] == ')') {
        closed_count++;
      }
      if (open_count != 0 && open_count == closed_count) {
        var first;
        if (functions_string[1] != "(") {
          // base case -- only two functions are composed
          first = [functions_string.substring(1, i + 1)];
        } else {
          // recursively split (find the next set of parenthesis)
          first = [...split_into_list(functions_string.substring(1, i + 1))];
        }
        return [...first,
                functions_string.substring(i + 2, functions_string.length - 1)];
      }
    }
  }
}


function get_arg_map(f_list) {
  var arg_map = [];
  for (var i = 0; i < f_list.length; i++) {
    var o_paren = f_list[i].indexOf("(");
    arg_map.push([f_list[i].substring(0, o_paren),
                  f_list[i].substring(o_paren + 1, f_list[i].length - 1).split(",")]);
  }
  return arg_map;
}


function string_to_transformation(entire_string, vals) {

  try {
    functions_string_list = split_into_list(entire_string);
  } catch(e) {
    throw "[ERROR: transformations.js] there was an error discerning which transformations you are trying to compose. " + e;
  }


  try {
    // create a list of ["function_name", [args]]
    var arg_map = get_arg_map(functions_string_list);
  } catch(e) {
    throw "[ERROR: transformations.js] there was an error understanding a transformation argument. " + e;
  }

  try {
    // parse arg lists
    var parsed_arg_map = [];
    for (var i = 0; i < arg_map.length; i++) {
      var new_list = [];
      for (var j = 0; j < arg_map[i][1].length; j++) {
        new_list.push(parse(arg_map[i][1][j], vals));
      }
      parsed_arg_map.push([arg_map[i][0], new_list]);
    }
  } catch(e) {
    throw "[ERROR: transformations.js] there was an error parsing an argument. " + e;
  }


  try {
    // get list of functions (evaluate meta functions)
    var functions = [];
    for (var i = 0; i < parsed_arg_map.length; i++) {
      functions.push(eval(parsed_arg_map[i][0])(...parsed_arg_map[i][1]));
    }

  } catch(e) {
    throw "[ERROR: transformations.js] there was an error evaluating a function. " + e;
  }

  // compose and return
  return compose(functions);
}


function matrix_to_transformation(matrix) {
  return M(matrix[0][0], matrix[0][1], matrix[1][0], matrix[1][1], matrix[0][2], matrix[1][2]);
}






