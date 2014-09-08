

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


module.exports.fromFileLine = fromFileLine;

var rowmans;
module.exports.__defineGetter__('ROWMANS', function() {
  if (!rowmans) {
    var contents = require('raw!../font/rowmans.jhf');
    rowmans = convertFile(contents);
  }
  return rowmans;
});