
const BARNSLEY_FERN = {
  guppy_xml: [
    '<m v="1.2.0"><e></e><f type="M" group="function"><b p="latex">\\text{M}\\left(<r ref="1"/>, <r ref="2"/>, <r ref="3"/>, <r ref="4"/>, <r ref="5"/>, <r ref="6"/>\\right)</b><b p="text">M($1, $2, $3, $4, $5, $6)</b><c><e>0</e></c><c><e>0</e></c><c><e>0</e></c><c><e>0.16</e></c><c><e>0</e></c><c><e>0</e></c></f><e></e></m>',
    '<m v="1.2.0"><e></e><f type="M" group="function"><b p="latex">\\text{M}\\left(<r ref="1"/>, <r ref="2"/>, <r ref="3"/>, <r ref="4"/>, <r ref="5"/>, <r ref="6"/>\\right)</b><b p="text">M($1, $2, $3, $4, $5, $6)</b><c><e>0.85</e></c><c><e>a</e></c><c><e>-a</e></c><c><e>0.85</e></c><c><e>0</e></c><c><e>1.6</e></c></f><e></e></m>',
    '<m v="1.2.0"><e></e><f type="M" group="function"><b p="latex">\\text{M}\\left(<r ref="1"/>, <r ref="2"/>, <r ref="3"/>, <r ref="4"/>, <r ref="5"/>, <r ref="6"/>\\right)</b><b p="text">M($1, $2, $3, $4, $5, $6)</b><c><e>0.20</e></c><c><e>-0.26</e></c><c><e>0.23</e></c><c><e>0.22</e></c><c><e>0</e></c><c><e>1.6</e></c></f><e></e></m>',
    '<m v="1.2.0"><e></e><f type="M" group="function"><b p="latex">\\text{M}\\left(<r ref="1"/>, <r ref="2"/>, <r ref="3"/>, <r ref="4"/>, <r ref="5"/>, <r ref="6"/>\\right)</b><b p="text">M($1, $2, $3, $4, $5, $6)</b><c><e>-0.15</e></c><c><e>0.28</e></c><c><e>0.26</e></c><c><e>0.24</e></c><c><e>0</e></c><c><e>0.44</e></c></f><e></e></m>'
  ],
  weights: [
    0.01, 0.85, 0.07, 0.07
  ],
  transformations: [
    M(0,0,0,0.16,0,0),
    M(0.85,0.04,-0.04,0.85,0,1.60),
    M(0.20,-0.26,0.23,0.22,0,1.60),
    M(-0.15,0.28,0.26,0.24,0,0.44)
  ],
  zoom: 50,
  center: {x:0, y:5},
  vars: {
    a:{
      min:-0.5,
      max:0.5,
      val: 0.04
    },
  }
};


const SERPINSKI = {
  guppy_xml: [
    '<m v="1.2.0"><e></e><f type="Scale" group="function"><b p="latex">\\text{Scale}\\left(<r ref="1"/>\\right)</b><b p="text">Scale($1)</b><c><e>0.5</e></c></f><e></e></m>',
    '<m v="1.2.0"><e></e><f type="Translate" group="function"><b p="latex">\\text{Translate}\\left(<r ref="1"/>, <r ref="2"/>\\right)</b><b p="text">Translate($1, $2)</b><c><e>0.25</e></c><c><e>0.5</e></c></f><e></e><f type="Scale" group="function"><b p="latex">\\text{Scale}\\left(<r ref="1"/>\\right)</b><b p="text">Scale($1)</b><c><e>0.5</e></c></f><e></e></m>',
    '<m v="1.2.0"><e></e><f type="Translate" group="function"><b p="latex">\\text{Translate}\\left(<r ref="1"/>, <r ref="2"/>\\right)</b><b p="text">Translate($1, $2)</b><c><e>0.5</e></c><c><e>0</e></c></f><e></e><f type="Scale" group="function"><b p="latex">\\text{Scale}\\left(<r ref="1"/>\\right)</b><b p="text">Scale($1)</b><c><e>0.5</e></c></f><e></e></m>'
  ],
  weights: [
    1, 1, 1
  ],
  transformations: [
    Scale(0.5),
    compose([Translate(0.25, 0.5), Scale(0.5)]),
    compose([Translate(0.5,0), Scale(0.5)])
  ],
  zoom: 640,
  center: {x:0.5, y:0.5}
}


const VON_KOCH = {
  guppy_xml: [
    '<m v="1.2.0"><e></e><f type="Scale" group="function"><b p="latex">\\text{Scale}\\left(<r ref="1"/>\\right)</b><b p="text">Scale($1)</b><c><e></e><f type="fraction" group="functions"><b p="latex">\\dfrac{<r ref="1"/>}{<r ref="2"/>}</b><b p="small_latex">\\frac{<r ref="1"/>}{<r ref="2"/>}</b><b p="asciimath">(<r ref="1"/>)/(<r ref="2"/>)</b><c up="1" down="2" name="numerator"><e>1</e></c><c up="1" down="2" delete="1" name="denominator"><e>3</e></c></f><e></e></c></f><e></e></m>',
    '<m v="1.2.0"><e></e><f type="Translate" group="function"><b p="latex">\\text{Translate}\\left(<r ref="1"/>, <r ref="2"/>\\right)</b><b p="text">Translate($1, $2)</b><c><e></e><f type="fraction" group="functions"><b p="latex">\\dfrac{<r ref="1"/>}{<r ref="2"/>}</b><b p="small_latex">\\frac{<r ref="1"/>}{<r ref="2"/>}</b><b p="asciimath">(<r ref="1"/>)/(<r ref="2"/>)</b><c up="1" down="2" name="numerator"><e>1</e></c><c up="1" down="2" delete="1" name="denominator"><e>3</e></c></f><e></e></c><c><e>0</e></c></f><e></e><f type="Rotate" group="function"><b p="latex">\\text{Rotate}\\left(<r ref="1"/>\\right)</b><b p="text">Rotate($1)</b><c><e></e><f type="fraction" group="functions"><b p="latex">\\dfrac{<r ref="1"/>}{<r ref="2"/>}</b><b p="small_latex">\\frac{<r ref="1"/>}{<r ref="2"/>}</b><b p="asciimath">(<r ref="1"/>)/(<r ref="2"/>)</b><c up="1" down="2" name="numerator"><e></e><f group="greek" type="pi"><b p="latex">\\pi</b><b p="asciimath"> pi </b></f><e></e></c><c up="1" down="2" delete="1" name="denominator"><e>3</e></c></f><e></e></c></f><e></e><f type="Scale" group="function"><b p="latex">\\text{Scale}\\left(<r ref="1"/>\\right)</b><b p="text">Scale($1)</b><c><e></e><f type="fraction" group="functions"><b p="latex">\\dfrac{<r ref="1"/>}{<r ref="2"/>}</b><b p="small_latex">\\frac{<r ref="1"/>}{<r ref="2"/>}</b><b p="asciimath">(<r ref="1"/>)/(<r ref="2"/>)</b><c up="1" down="2" name="numerator"><e>1</e></c><c up="1" down="2" delete="1" name="denominator"><e>3</e></c></f><e></e></c></f><e></e></m>',
    '<m v="1.2.0"><e></e><f type="Translate" group="function"><b p="latex">\\text{Translate}\\left(<r ref="1"/>, <r ref="2"/>\\right)</b><b p="text">Translate($1, $2)</b><c><e></e><f type="fraction" group="functions"><b p="latex">\\dfrac{<r ref="1"/>}{<r ref="2"/>}</b><b p="small_latex">\\frac{<r ref="1"/>}{<r ref="2"/>}</b><b p="asciimath">(<r ref="1"/>)/(<r ref="2"/>)</b><c up="1" down="2" name="numerator"><e>1</e></c><c up="1" down="2" delete="1" name="denominator"><e>2</e></c></f><e></e></c><c><e></e><f type="fraction" group="functions"><b p="latex">\\dfrac{<r ref="1"/>}{<r ref="2"/>}</b><b p="small_latex">\\frac{<r ref="1"/>}{<r ref="2"/>}</b><b p="asciimath">(<r ref="1"/>)/(<r ref="2"/>)</b><c up="1" down="2" name="numerator"><e></e><f type="squareroot" group="functions"><b p="latex">\\sqrt{<r ref="1"/>\\phantom{\\tiny{!}}}</b><b p="asciimath">sqrt(<r ref="1"/>)</b><c delete="1"><e>3</e></c></f><e></e></c><c up="1" down="2" delete="1" name="denominator"><e>6</e></c></f><e></e></c></f><e></e><f type="Rotate" group="function"><b p="latex">\\text{Rotate}\\left(<r ref="1"/>\\right)</b><b p="text">Rotate($1)</b><c><e></e><f type="fraction" group="functions"><b p="latex">\\dfrac{<r ref="1"/>}{<r ref="2"/>}</b><b p="small_latex">\\frac{<r ref="1"/>}{<r ref="2"/>}</b><b p="asciimath">(<r ref="1"/>)/(<r ref="2"/>)</b><c up="1" down="2" name="numerator"><e>-</e><f group="greek" type="pi"><b p="latex">\\pi</b><b p="asciimath"> pi </b></f><e></e></c><c up="1" down="2" delete="1" name="denominator"><e>3</e></c></f><e></e></c></f><e></e><f type="Scale" group="function"><b p="latex">\\text{Scale}\\left(<r ref="1"/>\\right)</b><b p="text">Scale($1)</b><c><e></e><f type="fraction" group="functions"><b p="latex">\\dfrac{<r ref="1"/>}{<r ref="2"/>}</b><b p="small_latex">\\frac{<r ref="1"/>}{<r ref="2"/>}</b><b p="asciimath">(<r ref="1"/>)/(<r ref="2"/>)</b><c up="1" down="2" name="numerator"><e>1</e></c><c up="1" down="2" delete="1" name="denominator"><e>3</e></c></f><e></e></c></f><e></e></m>',
    '<m v="1.2.0"><e></e><f type="Translate" group="function"><b p="latex">\\text{Translate}\\left(<r ref="1"/>, <r ref="2"/>\\right)</b><b p="text">Translate($1, $2)</b><c><e></e><f type="fraction" group="functions"><b p="latex">\\dfrac{<r ref="1"/>}{<r ref="2"/>}</b><b p="small_latex">\\frac{<r ref="1"/>}{<r ref="2"/>}</b><b p="asciimath">(<r ref="1"/>)/(<r ref="2"/>)</b><c up="1" down="2" name="numerator"><e>2</e></c><c up="1" down="2" delete="1" name="denominator"><e>3</e></c></f><e></e></c><c><e>0</e></c></f><e></e><f type="Scale" group="function"><b p="latex">\\text{Scale}\\left(<r ref="1"/>\\right)</b><b p="text">Scale($1)</b><c><e></e><f type="fraction" group="functions"><b p="latex">\\dfrac{<r ref="1"/>}{<r ref="2"/>}</b><b p="small_latex">\\frac{<r ref="1"/>}{<r ref="2"/>}</b><b p="asciimath">(<r ref="1"/>)/(<r ref="2"/>)</b><c up="1" down="2" name="numerator"><e>1</e></c><c up="1" down="2" delete="1" name="denominator"><e>3</e></c></f><e></e></c></f><e></e></m>"'
  ],
  weights: [
    1, 1, 1, 1
  ],
  transformations: [
    Scale(1/3),
    compose([Translate(1/3, 0), Rotate(Math.PI/3), Scale(1/3)]),
    compose([Translate(1/2, Math.sqrt(3)/6), Rotate(-Math.PI/3), Scale(1/3)]),
    compose([Translate(2/3, 0), Scale(1/3)])
  ],
  zoom: 640,
  center: {x: 0.5, y: 0.5}
}


const DRAGON = {
  guppy_xml: [
    '<m v="1.2.0"><e></e><f type="Rotate" group="function"><b p="latex">\\text{Rotate}\\left(<r ref="1"/>\\right)</b><b p="text">Rotate($1)</b><c><e></e><f type="fraction" group="functions"><b p="latex">\\dfrac{<r ref="1"/>}{<r ref="2"/>}</b><b p="small_latex">\\frac{<r ref="1"/>}{<r ref="2"/>}</b><b p="asciimath">(<r ref="1"/>)/(<r ref="2"/>)</b><c up="1" down="2" name="numerator"><e>-</e><f group="greek" type="pi"><b p="latex">\\pi</b><b p="asciimath"> pi </b></f><e></e></c><c up="1" down="2" delete="1" name="denominator"><e>4</e></c></f><e></e></c></f><e></e><f type="Scale" group="function"><b p="latex">\\text{Scale}\\left(<r ref="1"/>\\right)</b><b p="text">Scale($1)</b><c><e></e><f type="fraction" group="functions"><b p="latex">\\dfrac{<r ref="1"/>}{<r ref="2"/>}</b><b p="small_latex">\\frac{<r ref="1"/>}{<r ref="2"/>}</b><b p="asciimath">(<r ref="1"/>)/(<r ref="2"/>)</b><c up="1" down="2" name="numerator"><e>1</e></c><c up="1" down="2" delete="1" name="denominator"><e></e><f type="squareroot" group="functions"><b p="latex">\\sqrt{<r ref="1"/>\\phantom{\\tiny{!}}}</b><b p="asciimath">sqrt(<r ref="1"/>)</b><c delete="1"><e>2</e></c></f><e></e></c></f><e></e></c></f><e></e></m>',
    '<m v="1.2.0"><e></e><f type="Translate" group="function"><b p="latex">\\text{Translate}\\left(<r ref="1"/>, <r ref="2"/>\\right)</b><b p="text">Translate($1, $2)</b><c><e>1</e></c><c><e>0</e></c></f><e></e><f type="Rotate" group="function"><b p="latex">\\text{Rotate}\\left(<r ref="1"/>\\right)</b><b p="text">Rotate($1)</b><c><e></e><f type="fraction" group="functions"><b p="latex">\\dfrac{<r ref="1"/>}{<r ref="2"/>}</b><b p="small_latex">\\frac{<r ref="1"/>}{<r ref="2"/>}</b><b p="asciimath">(<r ref="1"/>)/(<r ref="2"/>)</b><c up="1" down="2" name="numerator"><e>5</e><f group="greek" type="pi"><b p="latex">\\pi</b><b p="asciimath"> pi </b></f><e></e></c><c up="1" down="2" delete="1" name="denominator"><e>4</e></c></f><e></e></c></f><e></e><f type="Scale" group="function"><b p="latex">\\text{Scale}\\left(<r ref="1"/>\\right)</b><b p="text">Scale($1)</b><c><e></e><f type="fraction" group="functions"><b p="latex">\\dfrac{<r ref="1"/>}{<r ref="2"/>}</b><b p="small_latex">\\frac{<r ref="1"/>}{<r ref="2"/>}</b><b p="asciimath">(<r ref="1"/>)/(<r ref="2"/>)</b><c up="1" down="2" name="numerator"><e>1</e></c><c up="1" down="2" delete="1" name="denominator"><e></e><f type="squareroot" group="functions"><b p="latex">\\sqrt{<r ref="1"/>\\phantom{\\tiny{!}}}</b><b p="asciimath">sqrt(<r ref="1"/>)</b><c delete="1"><e>2</e></c></f><e></e></c></f><e></e></c></f><e></e></m>'
  ],
  weights: [1, 1],
  transformations: [
    compose([Rotate(-Math.pi / 4), Scale(1 / Math.sqrt(2)),]),
    compose([Translate(0,1), Rotate(5 * Math.PI / 4), Scale(1 / Math.sqrt(2))])
  ],
  zoom: 340,
  center: {x: 0.5, y: 0}
}


const CRAB = {
  guppy_xml: [
    '<m v=\"1.2.0\"><e></e><f type=\"Translate\" group=\"function\"><b p=\"latex\">\\text{Translate}\\left(<r ref=\"1\"/>, <r ref=\"2\"/>\\right)</b><b p=\"text\">Translate($1, $2)</b><c><e>0.5</e></c><c><e>0.15</e></c></f><e></e><f type=\"Scale\" group=\"function\"><b p=\"latex\">\\text{Scale}\\left(<r ref=\"1\"/>\\right)</b><b p=\"text\">Scale($1)</b><c><e></e><f type=\"fraction\" group=\"functions\"><b p=\"latex\">\\dfrac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"small_latex\">\\frac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"asciimath\">(<r ref=\"1\"/>)/(<r ref=\"2\"/>)</b><c up=\"1\" down=\"2\" name=\"numerator\"><e>1</e></c><c up=\"1\" down=\"2\" delete=\"1\" name=\"denominator\"><e>4</e></c></f><e></e></c></f><e></e><f type=\"Rotate\" group=\"function\"><b p=\"latex\">\\text{Rotate}\\left(<r ref=\"1\"/>\\right)</b><b p=\"text\">Rotate($1)</b><c><e></e><f type=\"fraction\" group=\"functions\"><b p=\"latex\">\\dfrac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"small_latex\">\\frac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"asciimath\">(<r ref=\"1\"/>)/(<r ref=\"2\"/>)</b><c up=\"1\" down=\"2\" name=\"numerator\"><e></e><f group=\"greek\" type=\"pi\"><b p=\"latex\">\\pi</b><b p=\"asciimath\"> pi </b></f><e></e></c><c up=\"1\" down=\"2\" delete=\"1\" name=\"denominator\"><e>4</e></c></f><e></e></c></f><e></e></m>',
    "<m v=\"1.2.0\"><e></e><f type=\"Scale\" group=\"function\"><b p=\"latex\">\\text{Scale}\\left(<r ref=\"1\"/>\\right)</b><b p=\"text\">Scale($1)</b><c><e></e><f type=\"fraction\" group=\"functions\"><b p=\"latex\">\\dfrac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"small_latex\">\\frac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"asciimath\">(<r ref=\"1\"/>)/(<r ref=\"2\"/>)</b><c up=\"1\" down=\"2\" name=\"numerator\"><e>1</e></c><c up=\"1\" down=\"2\" delete=\"1\" name=\"denominator\"><e>2</e></c></f><e></e></c></f><e></e></m>",
    "<m v=\"1.2.0\"><e></e><f type=\"Translate\" group=\"function\"><b p=\"latex\">\\text{Translate}\\left(<r ref=\"1\"/>, <r ref=\"2\"/>\\right)</b><b p=\"text\">Translate($1, $2)</b><c><e>-0.5</e></c><c><e>0.15</e></c></f><e></e><f type=\"Scale\" group=\"function\"><b p=\"latex\">\\text{Scale}\\left(<r ref=\"1\"/>\\right)</b><b p=\"text\">Scale($1)</b><c><e></e><f type=\"fraction\" group=\"functions\"><b p=\"latex\">\\dfrac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"small_latex\">\\frac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"asciimath\">(<r ref=\"1\"/>)/(<r ref=\"2\"/>)</b><c up=\"1\" down=\"2\" name=\"numerator\"><e>1</e></c><c up=\"1\" down=\"2\" delete=\"1\" name=\"denominator\"><e>4</e></c></f><e></e></c></f><e></e><f type=\"Rotate\" group=\"function\"><b p=\"latex\">\\text{Rotate}\\left(<r ref=\"1\"/>\\right)</b><b p=\"text\">Rotate($1)</b><c><e></e><f type=\"fraction\" group=\"functions\"><b p=\"latex\">\\dfrac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"small_latex\">\\frac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"asciimath\">(<r ref=\"1\"/>)/(<r ref=\"2\"/>)</b><c up=\"1\" down=\"2\" name=\"numerator\"><e>-</e><f group=\"greek\" type=\"pi\"><b p=\"latex\">\\pi</b><b p=\"asciimath\"> pi </b></f><e></e></c><c up=\"1\" down=\"2\" delete=\"1\" name=\"denominator\"><e>4</e></c></f><e></e></c></f><e></e></m>",
    "<m v=\"1.2.0\"><e></e><f type=\"Rotate\" group=\"function\"><b p=\"latex\">\\text{Rotate}\\left(<r ref=\"1\"/>\\right)</b><b p=\"text\">Rotate($1)</b><c><e></e><f type=\"fraction\" group=\"functions\"><b p=\"latex\">\\dfrac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"small_latex\">\\frac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"asciimath\">(<r ref=\"1\"/>)/(<r ref=\"2\"/>)</b><c up=\"1\" down=\"2\" name=\"numerator\"><e>-</e><f group=\"greek\" type=\"pi\"><b p=\"latex\">\\pi</b><b p=\"asciimath\"> pi </b></f><e></e></c><c up=\"1\" down=\"2\" delete=\"1\" name=\"denominator\"><e>6</e></c></f><e></e></c></f><e></e><f type=\"Scale\" group=\"function\"><b p=\"latex\">\\text{Scale}\\left(<r ref=\"1\"/>\\right)</b><b p=\"text\">Scale($1)</b><c><e></e><f type=\"fraction\" group=\"functions\"><b p=\"latex\">\\dfrac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"small_latex\">\\frac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"asciimath\">(<r ref=\"1\"/>)/(<r ref=\"2\"/>)</b><c up=\"1\" down=\"2\" name=\"numerator\"><e>1</e></c><c up=\"1\" down=\"2\" delete=\"1\" name=\"denominator\"><e>2</e></c></f><e></e></c></f><e></e></m>",
    "<m v=\"1.2.0\"><e></e><f type=\"Rotate\" group=\"function\"><b p=\"latex\">\\text{Rotate}\\left(<r ref=\"1\"/>\\right)</b><b p=\"text\">Rotate($1)</b><c><e></e><f type=\"fraction\" group=\"functions\"><b p=\"latex\">\\dfrac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"small_latex\">\\frac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"asciimath\">(<r ref=\"1\"/>)/(<r ref=\"2\"/>)</b><c up=\"1\" down=\"2\" name=\"numerator\"><e></e><f group=\"greek\" type=\"pi\"><b p=\"latex\">\\pi</b><b p=\"asciimath\"> pi </b></f><e></e></c><c up=\"1\" down=\"2\" delete=\"1\" name=\"denominator\"><e>6</e></c></f><e></e></c></f><e></e><f type=\"Scale\" group=\"function\"><b p=\"latex\">\\text{Scale}\\left(<r ref=\"1\"/>\\right)</b><b p=\"text\">Scale($1)</b><c><e></e><f type=\"fraction\" group=\"functions\"><b p=\"latex\">\\dfrac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"small_latex\">\\frac{<r ref=\"1\"/>}{<r ref=\"2\"/>}</b><b p=\"asciimath\">(<r ref=\"1\"/>)/(<r ref=\"2\"/>)</b><c up=\"1\" down=\"2\" name=\"numerator\"><e>1</e></c><c up=\"1\" down=\"2\" delete=\"1\" name=\"denominator\"><e>2</e></c></f><e></e></c></f><e></e></m>"
  ],
  weights: [1, 1, 1, 1, 1],
  transformations: [
    compose([Translate(0.5,0.15), Scale(1/4), Rotate(Math.PI/4)]),
    compose([Scale(1/2)]),
    compose([Translate(-0.5, 0.15), Rotate(-Math.PI/4), Scale(1/4)]),
    compose([Rotate(-Math.PI/6), Scale(1/2)]),
    compose([Rotate(Math.PI/6), Scale(1/2)]),
  ],
  zoom: 700,
  center: {x: 0, y: 0}
}

const TREE = {
  guppy_xml: [
    "<m v=\"1.2.0\"><e></e><f type=\"M\" group=\"function\"><b p=\"latex\">\\text{M}\\left(<r ref=\"1\"/>, <r ref=\"2\"/>, <r ref=\"3\"/>, <r ref=\"4\"/>, <r ref=\"5\"/>, <r ref=\"6\"/>\\right)</b><b p=\"text\">M($1, $2, $3, $4, $5, $6)</b><c><e>0.195</e></c><c><e>-0.488</e></c><c><e>0.462</e></c><c><e>0.414</e></c><c><e>0.4431</e></c><c><e>0.2452</e></c></f><e></e></m>",
    "<m v=\"1.2.0\"><e></e><f type=\"M\" group=\"function\"><b p=\"latex\">\\text{M}\\left(<r ref=\"1\"/>, <r ref=\"2\"/>, <r ref=\"3\"/>, <r ref=\"4\"/>, <r ref=\"5\"/>, <r ref=\"6\"/>\\right)</b><b p=\"text\">M($1, $2, $3, $4, $5, $6)</b><c><e>0.462</e></c><c><e>0.414</e></c><c><e>-0.252</e></c><c><e>0.361</e></c><c><e>0.2511</e></c><c><e>0.5692</e></c></f><e></e></m>",
    "<m v=\"1.2.0\"><e></e><f type=\"M\" group=\"function\"><b p=\"latex\">\\text{M}\\left(<r ref=\"1\"/>, <r ref=\"2\"/>, <r ref=\"3\"/>, <r ref=\"4\"/>, <r ref=\"5\"/>, <r ref=\"6\"/>\\right)</b><b p=\"text\">M($1, $2, $3, $4, $5, $6)</b><c><e>-0.058</e></c><c><e>-0.07</e></c><c><e>0.453</e></c><c><e>-0.111</e></c><c><e>0.5976</e></c><c><e>0.0969</e></c></f><e></e></m>",
    "<m v=\"1.2.0\"><e></e><f type=\"M\" group=\"function\"><b p=\"latex\">\\text{M}\\left(<r ref=\"1\"/>, <r ref=\"2\"/>, <r ref=\"3\"/>, <r ref=\"4\"/>, <r ref=\"5\"/>, <r ref=\"6\"/>\\right)</b><b p=\"text\">M($1, $2, $3, $4, $5, $6)</b><c><e>-0.035</e></c><c><e>0.07</e></c><c><e>-0.469</e></c><c><e>-0.022</e></c><c><e>0.4884</e></c><c><e>0.5069</e></c></f><e></e></m>",
    "<m v=\"1.2.0\"><e></e><f type=\"M\" group=\"function\"><b p=\"latex\">\\text{M}\\left(<r ref=\"1\"/>, <r ref=\"2\"/>, <r ref=\"3\"/>, <r ref=\"4\"/>, <r ref=\"5\"/>, <r ref=\"6\"/>\\right)</b><b p=\"text\">M($1, $2, $3, $4, $5, $6)</b><c><e>-0.637</e></c><c><e>0</e></c><c><e>0</e></c><c><e>0.501</e></c><c><e>0.8562</e></c><c><e>0.2513</e></c></f><e></e></m>"
  ],
  weights: [0.2, 0.25, 0.2, 0.25, 0.1],
  transformations: [
    M(0.195, -0.488, 0.462, 0.414, 0.4431, 0.2452),
    M(0.462, 0.414, -0.252, 0.361,  0.2511, 0.5692),
    M(-0.058, -0.07, 0.453, -0.111,  0.5976, 0.0969),
    M(-0.035, 0.0, -0.469, -0.022, 0.4884, 0.5069),
    M(-0.637, 0, 0, 0.501, 0.8562, 0.2513)
  ],
  zoom: 700,
  center: {x: 0.5, y: 0.5}
}





const EXAMPLES = [BARNSLEY_FERN, SERPINSKI, VON_KOCH, DRAGON, CRAB, TREE];
