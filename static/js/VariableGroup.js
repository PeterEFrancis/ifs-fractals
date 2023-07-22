
class VariableSlider {


  constructor(name, group) {
    this.name = name;
    this.group = group;
    this.variable_container = document.createElement('div');

    this.ani_id;
    this.ani_playing = false;
    this.ani_dir = 1;

    // error handling
    this.errors = [
      "min value must be an number",
      "max value must be an number",
      "variable value must be a number",
      "step value must be a number"
    ];
    this.current_errors = [0,0,0,0];

    // create elements
    let row = document.createElement('div');
      let name_col = document.createElement('div');
        let name_input_group = document.createElement('div');
          let name_addon = document.createElement('span');
          this.name_input = document.createElement('input');
      let slider_col = document.createElement('div');
        let slider_row = document.createElement('div');
          let slider_input_col = document.createElement('div');
            this.slider = document.createElement('input');
        let bounds_row = document.createElement('div');
      let lower_bound_col = document.createElement('div');
        this.lower_bound_input = document.createElement('input');
      let step_col = document.createElement('div');
        let step_label = document.createElement('label');
          let step_span = document.createElement('span');
          this.step_input = document.createElement('input');
      let btn_col = document.createElement('div');
        this.ani_btn = document.createElement('button');
      let upper_bound_col = document.createElement('div');
        this.upper_bound_input = document.createElement('input');
      let trash_col = document.createElement('div');
        let trash_link = document.createElement('a');
          let trash_icon = document.createElement('span');
      this.error = document.createElement('p');


    // place elements (containments)
    this.variable_container.appendChild(row);
      row.appendChild(name_col);
        name_col.appendChild(name_input_group)
          name_input_group.appendChild(name_addon);
          name_input_group.appendChild(this.name_input);
      row.appendChild(slider_col);
        slider_col.appendChild(slider_row);
          slider_row.appendChild(slider_input_col);
            slider_input_col.appendChild(this.slider);
        slider_col.appendChild(bounds_row);
          bounds_row.appendChild(lower_bound_col);
            lower_bound_col.appendChild(this.lower_bound_input);
          bounds_row.appendChild(step_col);
            step_col.appendChild(step_label);
              step_label.appendChild(step_span);
              step_label.appendChild(this.step_input);
          bounds_row.appendChild(btn_col);
            btn_col.appendChild(this.ani_btn);
          bounds_row.appendChild(upper_bound_col);
            upper_bound_col.appendChild(this.upper_bound_input);
      row.appendChild(trash_col);
        trash_col.appendChild(trash_link);
          trash_link.appendChild(trash_icon);
    this.variable_container.appendChild(this.error);


    // add text
    name_addon.appendChild(document.createTextNode(this.name));
    step_span.innerHTML = '&Delta; = ';


    // style elements
    this.variable_container.classList.add('variable-container');
    this.variable_container.classList.add('container-fluid');
    row.classList.add('row');
      name_col.classList.add('col-xs-3');
        name_input_group.classList.add('input-group');
          name_addon.classList.add('input-group-addon');
          name_addon.classList.add('name-input-group-addon');
          this.name_input.classList.add('form-control')
          // this.name_input.setAttribute('type', 'number');
      slider_col.classList.add('col-xs-8');
        slider_row.classList.add('row');
          slider_input_col.classList.add('col-xs-12');
            this.slider.setAttribute('type', 'range');
            this.slider.classList.add('slider');
        bounds_row.classList.add('row');
          lower_bound_col.classList.add('col-xs-2');
            this.lower_bound_input.classList.add('form-control');
            this.lower_bound_input.classList.add('bound');
            // this.lower_bound_input.setAttribute('type', 'number');
          step_col.classList.add('col-xs-5', 'step-col');
            step_label.classList.add('step-label');
              this.step_input.classList.add('step-input')
              // this.step_input.setAttribute('type', 'number');
          btn_col.classList.add('col-xs-3');
            this.ani_btn.classList.add('btn', 'btn-xs', 'ani-btn', 'btn-default');
            this.ani_btn.innerHTML = '<span class="glyphicon glyphicon-play"></span>';
          upper_bound_col.classList.add('col-xs-2');
            this.upper_bound_input.classList.add('form-control');
            this.upper_bound_input.classList.add('bound');
            // this.upper_bound_input.setAttribute('type', 'number');
      trash_col.classList.add('col-xs-1');
      trash_col.classList.add('text-right');
        trash_link.classList.add('btn');
        trash_link.classList.add('trash-link');
          trash_icon.classList.add('glyphicon');
          trash_icon.classList.add('glyphicon-trash');
    this.error.classList.add('variable-slider-error');


    // set default values
    this.name_input.value = 0.5;
    this.lower_bound_input.value = 0;
    this.slider.min = 0;
    this.upper_bound_input.value = 1;
    this.slider.max = 1;
    this.step_input.value = 0.01;
    this.slider.step = 0.01;
    this.slider.value = 0.5;


    // make elements active
    const vars = this;
    trash_link.onclick = function() {
      vars.delete();
    }
    this.name_input.onchange = function() {
      vars.set_value(vars.name_input.value);
      vars.group.onchange();
    }
    this.slider.oninput = function() {
      vars.set_value(vars.slider.value);
      vars.group.onchange();
    }
    this.lower_bound_input.onchange = function() {
      vars.set_min(vars.lower_bound_input.value);
    }
    this.upper_bound_input.onchange = function() {
      vars.set_max(vars.upper_bound_input.value);
    }
    this.step_input.onchange = function() {
      vars.set_step(vars.step_input.value);
    }
    this.ani_btn.onclick = function() {
      if (vars.ani_playing) {
        vars.stop_ani();
      } else {
        vars.start_ani();
      }
    }
  }



  set_error(num) {
    this.current_errors[num] = 1;
    this.display_errors();
  }

  remove_error(num) {
    this.current_errors[num] = 0;
    this.display_errors();
  }

  display_errors() {
    var is_error = false;
    for (var i = 0; i < this.current_errors.length; i++) {
      if (this.current_errors[i] == 1) {
        this.error.innerHTML = '<span class="glyphicon glyphicon-warning-sign"></span> ' + this.errors[i];
        is_error = true;
        break;
      }
    }
    if (!is_error) {
      this.error.innerHTML = "";
    }
  }

  set_min(m) {
    if (m == "") {
      this.set_min(this.slider.min);
    } else if (isNaN(m)) {
      this.set_error(0);
    } else {
      m = Number(m);
      if (m >= this.get_max()) {
        this.set_max(this.get_max() - this.get_min() + m);
        this.set_min(m)
      } else {
        this.remove_error(0);
        if (m > this.get_value()) {
          this.set_value(m);
        }
        this.slider.min = Number(m);
        this.lower_bound_input.value = Number(m);
      }
    }
  }

  get_min() {
    return Number(this.slider.min);
  }

  set_max(m) {
    if (m == "") {
      this.set_max(this.slider.max);
    } else if (isNaN(m)) {
      this.set_error(1);
    } else if (m <= this.get_min()) {
      this.set_min(m - (this.get_max() - this.get_min()))
      this.set_max(m);
    } else {
      this.remove_error(1);
      if (m < this.get_value()) {
        this.set_value(m);
      }
      this.slider.max = Number(m);
      this.upper_bound_input.value = Number(m);
    }
  }

  get_max() {
    return Number(this.slider.max);
  }

  set_value(val) {
    if (isNaN(val)) {
      this.set_error(2);
    } else {
      this.remove_error(2);
      if (val < this.get_min()) {
        this.set_min(val);
      }
      if (val > this.get_max()) {
        this.set_max(val);
      }
      this.name_input.value = Number(val);
      this.slider.value = Number(val);
    }
  }

  set_step(s) {
    if (isNaN(s)) {
      this.set_error(3);
    } else {
      this.remove_error(3);
      this.slider.step = Number(s);
      this.step_input.value = Number(s);
    }
  }

  get_step() {
    return Number(this.slider.step);
  }

  get_value() {
    return Number(this.name_input.value);
  }

  delete() {
    this.group.delete(this.name);
  }

  start_ani() {
    this.ani_playing = true;
    this.ani_btn.innerHTML = '<span class="glyphicon glyphicon-pause"></span>';
    const t = this;
    this.ani_id = setInterval(function() {
      let new_val = t.get_value() + t.get_step() * t.ani_dir;
      if (new_val > t.get_max()) {
        t.ani_dir = -1;
      } else if (new_val < t.get_min()) {
        t.ani_dir = 1;
      }
      let depth = Math.pow(10, Math.round(-Math.log(t.get_step())));
      new_val = Math.round((t.get_value() + t.get_step() * t.ani_dir) * depth) / depth;
      t.set_value(new_val);
      t.group.onchange();
    }, 50);
  }

  stop_ani() {
    clearInterval(this.ani_id);
    this.ani_playing = false;
    this.ani_btn.innerHTML = '<span class="glyphicon glyphicon-play"></span>';
  }

}




class VariableGroup {

  constructor(container) {
    this.container = container;
    this.variables = {};
    this.onchange = function() {};
  }

  var_name_exists(name) {
    return name in this.variables;
  }

  add_variable(name) {
    if (this.var_name_exists(name)) {
      throw "cannot create a duplicate variable name";
    } else {
      var new_vars = new VariableSlider(name, this);
      this.variables[name] = new_vars;
      this.container.appendChild(new_vars.variable_container);
      var line = document.createElement('hr');
      line.setAttribute('id', 'variable-separator-line-' + name);
      line.classList.add('variable-separator');
      this.container.appendChild(line);
      this.onchange();
      return new_vars;
    }
  }

  add_next_variable() {
    var count = 0;
    for (var i in this.variables) {
      count++;
    }
    if (count == 26) {
      throw "cannot add more than 26 variables";
    } else {
      for (var i = 0; i < 26; i++) {
        var letter = "abcdefghijklmnopqrstuvwxyz".substring(i, i + 1);
        if (!this.var_name_exists(letter)) {
          return this.add_variable(letter);
          break;
        }
      }
    }
  }

  get_values() {
    var vars = {};
    for (var v in this.variables) {
      vars[v] = this.variables[v].get_value();
    }
    return vars;
  }

  get_values_and_bounds() {
    var vars = {};
    for (var v in this.variables) {
      vars[v] = {
        min: this.variables[v].get_min(),
        max: this.variables[v].get_max(),
        val: this.variables[v].get_value(),
        step: this.variables[v].get_step()
      };
    }
    return vars;
  }

  delete(name) {
    if (!this.var_name_exists(name)) {
      throw "cannot delete variable that doesn't exist";
    } else {
      // remove from HTML
      this.variables[name].variable_container.remove();
      // remove from list of variables
      delete this.variables[name];
      // remove hr
      document.getElementById('variable-separator-line-' + name).remove();
    }
  }

}
