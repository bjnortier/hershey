// Read a single glyph from the file line.
// The format is described here:
// http://emergent.unpythonic.net/software/hershey
function fromFileLine(line) {

  // All numbers are relative to the ascii value of 'R'
  var R = 'R'.charCodeAt(0);
  var number = parseInt(line.substr(0,5));
  var left = line[8].charCodeAt(0) - R;
  var right = line[9].charCodeAt(0) - R;

  // Includes the L/R pair
  var numVertices = parseInt(line.substr(5,3), 10) - 1;
  var instructions = [];
  for (var i = 0; i < numVertices; ++i) {
    var x = line[10+i*2].charCodeAt(0) - R;
    var y = line[11+i*2].charCodeAt(0) - R;
    if ((x === -50) && (y === 0)) {
      instructions.push('R');
    } else {
      instructions.push([x,y]);
    }
  }

  return {
    number: number,
    left: left,
    right: right,
    instructions: instructions,
  };

}

function convertFile(contents) {
  var lines = contents.split('\n');
  return lines.reduce(function(acc, line) {
    if (line.trim().length) {
      var glyph = fromFileLine(line);
      acc[glyph.number] = glyph;
    }
    return acc;
  }, {});
}

var translation = require('./translation');
var rowmansBase64 = require('../font/js/rowmans.js');
var rowmans = convertFile(new Buffer(rowmansBase64, 'base64').toString('ascii'));

// Generate the points for a sentence
function stringToLines(string) {

  var result = string.split('').reduce(function(acc, ch) {
    var glyphNumber = translation[ch];
    var glyph = rowmans[glyphNumber];
    if (!glyph) {
      glyph = translation(' ');
    }

    // Align to the left
    acc.xOffset -= glyph.left;

    // Generates the lines for the character
    var points = [];
    var instructions = glyph.instructions;
    for (var j = 0; j < instructions.length; ++j) {
      var instruction = instructions[j];
      if (instruction === 'R') {
        // Pen up
        acc.lines.push(points);
        points = [];
      } else if (j === (instructions.length-1)) {
        // Last point
        points.push([acc.xOffset + instruction[0], instruction[1]]);
        acc.lines.push(points);
      } else {
        points.push([acc.xOffset + instruction[0], instruction[1]]);
      }
    }

    acc.xOffset += (glyph.right);
    return acc;
  }, {xOffset: 0, lines: []});

  return {
    width: result.xOffset,
    lines: result.lines,
  };
}

// ----- External -----

module.exports.fromFileLine = fromFileLine;
module.exports.stringToLines = stringToLines;