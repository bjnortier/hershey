var chai = require('chai');
var assert = chai.assert;


var hershey = require('..');

// Test the interpretation of a single line of the font file
describe('Line Parser', function() {

  it('can convert a line to plotter instructions', function() {

    var line = '    8  9MWOMOV RUMUV ROQUQ';
    var expected = {
      number: 8,
      left: -5,
      right: 5,
      instructions: [
        [-3,-5],
        [-3,4],
        'R',
        [3,-5],
        [3,4],
        'R',
        [-3,-1],
        [3,-1],
      ]
    };
    var result = hershey.fromFileLine(line);
    assert.deepEqual(result, expected);

  });

});
