var fs   = require('fs');
var join = require('path').join;

/**
 * Example styl-resolver
 *
 * Resolve & Read @import filename
 * Where filename is extensionless or .styl file.
 *
 * @param {Object|String} options - defines `base` directory for resolver probing
 * @return {Function}
 * @api public
 */
module.exports = function(options) {
  options = options || {};
  if ('string' == typeof options) {
    options = { base: options };
  }

  if (!options.base)
    throw new Error('Options: options.base is required.');

  /**
   * Resolve callback, called for each @import rule in css/.styl file
   *
   * @param {String} path - relative path of file to resolve
   * @return {String} the resoved file as a string or null if not resolved
   * @api public
   *
   * Returning null causes the literal @import path to be output in the compiled css
   * afording css-whitespace to use other resolving mechanisms to resolve imports.
   */
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