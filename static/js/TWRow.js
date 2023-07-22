

class TWRow {

  constructor(id, row_container, group) {

    this.id = id;

    var ths = this;

    this.group = group;

    // create physical row
    this.tr = document.createElement('tr');
      this.tr.setAttribute('id', 'TW-row-' + id);
      var color_td = document.createElement('td');
          color_td.style.backgroundColor = '#' + this.group.color_function(id);
          color_td.classList.add('color-cell');
        this.tr.appendChild(color_td);

      var guppy_container = document.createElement('td');
        guppy_container.classList.add("guppy-container");
        var div = document.createElement('div');
          div.classList.add("transformation-dialogue");
          div.setAttribute('id', 'TW-row-guppy-div-' + id);
        guppy_container.appendChild(div);
      this.tr.appendChild(guppy_container);

      var weight_container = document.createElement('td');
        weight_container.classList.add("weight-container");
        this.weight = document.createElement('input');
          this.weight.setAttribute('id', 'TW-row-weight-' + id);
          this.weight.setAttribute('type', 'text');
          this.weight.classList.add("form-control");
          this.weight.value = 1;
          this.weight.onchange = function() {
            ths.group.onchange();
            if (ths.weight.value == "") {
              ths.weight.value = 1;
            }
          };
        weight_container.appendChild(this.weight);
      weight_container.onclick = function() {
        ths.weight.focus();
      }
      this.tr.appendChild(weight_container);


      var trash_container = document.createElement('td');
        trash_container.classList.add("trash-container");
        var trash_btn = document.createElement('a');
          var row = this;
          trash_btn.onclick = function() {
            row.delete();
          }
          trash_btn.classList.add("btn");
          trash_btn.classList.add("btn-link");
          var trash = document.createElement('span');
            trash.classList.add("glyphicon");
            trash.classList.add("glyphicon-trash");
          trash_btn.appendChild(trash);
        trash_container.appendChild(trash_btn);
      this.tr.appendChild(trash_container);

    // add row to container (necessary bc of guppy's id-lookup procedure :( )
    row_container.appendChild(this.tr);

    // create guppy backend
    this.guppy = new Guppy(div.id);
    this.guppy.event('change', function() {
      ths.group.onchange();
    })

    // add all of the necessary symbols and functions
    for (var func in SYMBOLS) {
      this.guppy.engine.add_symbol(func, SYMBOLS[func]);
    }

    this.guppy.import_text('Scale(0.5)');
    this.guppy.engine.end();
    this.guppy.render(true);

  }

  delete() {
    this.tr.remove();
    for (var i = 0; i < this.group.all_rows.length; i++) {
      if (this.id == this.group.all_rows[i].id) {
        this.group.all_rows.splice(i,1);
        break;
      }
    }
    this.group.onchange();
    delete this;
  }

  get_weight() {
    return parse(this.weight.value, this.group.variable_group.get_values());
  }

  set_weight(weight) { // weight is a parsable string
    this.weight.value = weight;
  }

  get_transformation() {

    try {
      var entire_string = this.guppy.engine.get_content('text');
    } catch(e) {
      var entire_string = "";
      if (this.guppy.engine.get_content('latex') == " ") {
        throw "[ERROR: TWRow.js] transformation cannot be left empty";
      } else {
        throw "[ERROR: TWRow.js] there was a (guppy) error understanding the transfomation input.";
      }
    }

    if (entire_string == "") {
      return null;
    }

    return string_to_transformation(entire_string, this.group.variable_group.get_values());
  }

  get_matrix() {
    return matrix_from_transformation(this.get_transformation());
  }

  get_factorization() {
    return factor_transformation(this.get_transformation());
  }

}



class TWRowGroup {

  constructor(table_container, variable_group, color_function) {
    this.table_container = table_container;
    this.table = document.createElement('table');
    this.table_container.appendChild(this.table);
    this.table.style.width = "100%";
    this.all_rows = [];
    this.variable_group = variable_group;
    this.onchange = function() {};
    this.color_function = color_function;
  }

  add_row() {
    // find an available ID
    var id = 0;
    while (true) {
      var matched = false;
      for (var i = 0; i < this.all_rows.length; i++) {
        if (this.all_rows[i].id == id) {
          matched = true;
          break;
        }
      }
      if (matched) {
        id++;
      } else {
        break;
      }
    }
    // create and place a new row
    var new_row = new TWRow(id, this.table, this);
    this.all_rows.push(new_row);
    // this.table.appendChild(new_row.tr); <--- this is now done in TWRow -- thanks a lot, Guppy :(
    this.onchange();
  }

  get_all_content(type) {
    // "type" is from Guppy - ex: 'latex', 'ast', 'text'
    var output = [];
    for (var i in this.all_rows) {
      try {
        output[i] = this.all_rows[i].guppy.engine.get_content(type);
      } catch(e) {}
    }
    return output;
  }

  get_all_weight_text() {
    var output = [];
    for (var i in this.all_rows) {
      try {
        output[i] = this.all_rows[i].weight.value;
      } catch(e) {}
    }
    return output;
  }

  get_TW() {
    // get content

    var weights = [];
    var transformations = [];

    for (var i = 0; i < this.all_rows.length; i++) {
      var w = this.all_rows[i].get_weight();
      var t = this.all_rows[i].get_transformation();
      if (t != null) {
        weights.push(w);
        transformations.push(t);
      }
    }

    // return list of transformations
    return {transformations: transformations, weights: weights};
  }

  get_ids() {
    var ids = [];
    for (var i = 0; i < this.all_rows.length; i++) {
      ids.push(this.all_rows[i].id);
    }
    return ids;
  }

  get_matrices() {
    var matrices = [];
    for (var i in this.all_rows) {
      matrices.push(this.all_rows[i].get_matrix());
    }
    return matrices;
  }

  get_weights() {
    var s = 0;
    for (var i in this.all_rows) {
      s += this.all_rows[i].get_weight();
    }
    var w = [];
    for (var i in this.all_rows) {
      w.push(this.all_rows[i].get_weight() / s);
    }
    return w;
  }

  get_factorizations() {
    var factorizations = [];
    for (var i in this.all_rows) {
      factorizations.push(this.all_rows[i].get_factorization());
    }
    return factorizations;
  }

  delete_all() {
    const l = this.all_rows.length;
    for (var i = 0; i < l; i++) {
      this.all_rows[0].delete();
    }
  }

  equalize_weights() {
    for (var i = 0; i < this.all_rows.length; i++) {
      this.all_rows[i].set_weight('1/' + this.all_rows.length);
    }
  }

}
