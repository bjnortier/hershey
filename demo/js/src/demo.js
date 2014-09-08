
var $ = require('jquery');

var Viewport = require('./viewport');
var Trackball = require('./trackball');
var hershey = require('../../../');

var viewport = new Viewport($('#viewport')[0]);
new Trackball([viewport]);

var i = 0;
for (var glyphNumber in hershey.ROWMANS) {
  var glyph = hershey.ROWMANS[glyphNumber];
  var instructions = glyph.instructions;

  if (i < 100) {
    console.log(glyph.number);
    var points = [];
    for (var j = 0; j < instructions.length; ++j) {
      var instruction = instructions[j];
      if (instruction === 'R') {
        // Pen up
        viewport.addLine(points, i);
        points = [];
      } else if (j === (instructions.length-1)) {
        // Last point
        points.push(instruction);
        viewport.addLine(points, i);
      } else {
        points.push(instruction);
      }
    }
  }
  ++i;
}