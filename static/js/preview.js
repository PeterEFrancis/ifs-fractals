function create_preview_canvas(playground, size, input_canvas) {
	const canvas = input_canvas || document.createElement('canvas');
    canvas.width = canvas.height = size;

    let tw = {
      transformations: [],
      weights: []
    };

    const transformation_list = playground.transformations.split('&');
    
    let vals = {};
        for (let i in playground.vars) {
          vals[i] = playground.vars[i].val;
        }

    for (let i = 0; i < transformation_list.length; i++) {
      tw.transformations.push(string_to_transformation(transformation_list[i], vals));
    }

    const weights_list = playground.weights;
	for (let i = 0; i < weights_list.length; i++) {
		if (playground.weights == 'auto') {
	    	tw.weights.push(1)
	  	} else {
      		tw.weights.push(parse(weights_list[i], vals));
      	}
    }

    if (playground.weights == 'auto') {
    	let matrices = tw.transformation.map(x => matrix_from_transformation(t));
    	tw.weights = get_auto_distribute_weights(matrices, 0.01)
    }


    let cart = new Cartesian(canvas);
    cart.set_color(playground.color);
	let fractal = new Fractal(cart, tw);
	cart.set_with_bounds(fractal.get_bounds(), 0.9);
	fractal.set_max_number_of_points(100000);
	fractal.plot();
    

    return canvas;


}