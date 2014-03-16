var fs   = require('fs');
var join = require('path').join;

module.exports = function(options) {
  options = options || {};
  if ('string' == typeof options) {
    options = { base: options };
  }

  if (!options.base)
    throw new Error('Options: options.base is required.');

  return function(path) {
    // only match .styl extension or no extension at all
    var match = path.match(/^['"]?([^.]+?)(?:\.styl)?['"]?$/);
    if (match) {
      var file = join(options.base, match[1]) + '.styl'
      if (fs.existsSync(file))
        return fs.readFileSync(file, 'utf8');
    }  
    return null;
  }
}