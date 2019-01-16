var fs = require('fs')

var jhfFilenames = fs.readdirSync('font/jhf').filter(function (filename) {
  return /^(.*)\.jhf$/.exec(filename)
})
jhfFilenames.forEach(function (sourceFilename) {
  // Read as base64 and write back as a module
  const base64 = fs.readFileSync('font/jhf/' + sourceFilename, 'base64')
  const module = 'export default "' + base64 + '";'
  try { fs.mkdirSync('font/js') } catch (e) {}
  fs.writeFileSync('src/' + /^(.*)\.jhf$/.exec(sourceFilename)[1] + '.js', module)
})
