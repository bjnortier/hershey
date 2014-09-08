var fs = require('fs');


var jhfFilenames = fs.readdirSync('font/jhf').filter(function(filename) {
  return /^(.*)\.jhf$/.exec(filename);
});
jhfFilenames.forEach(function(sourceFilename) {
  // Read as base64 and write back as a module
  var base64 = fs.readFileSync('font/jhf/' + sourceFilename, 'base64');
  var module = 'module.exports = "' + base64 + '";';
  try { fs.mkdirSync('font/js'); } catch(e) {}
  console.log(/^(.*)\.jhf$/.exec(sourceFilename));
  fs.writeFileSync('font/js/' + /^(.*)\.jhf$/.exec(sourceFilename)[1] + '.js', module);
});

