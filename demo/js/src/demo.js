
var $ = require('jquery');

var Viewport = require('./viewport');
var Trackball = require('./trackball');
var hershey = require('../../../');

var viewport = new Viewport($('#viewport')[0]);
new Trackball([viewport]);

var result = hershey.stringToLines('The QUICK brown fox jumped over the lazy DOG.');
result.lines.forEach(function(points) {
  var line = viewport.addLine(points);
  line.position.y = -result.width/2;
});
