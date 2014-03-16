
/**
 * Module dependencies.
 */

var lexer = require('./lib/lexer');
var parse = require('./lib/parser');
var compile = require('./lib/compiler');
var importer = require('./lib/importer');

/**
 * Compile a whitespace significant
 * `str` of CSS to the valid CSS
 * equivalent.
 *
 * @param {String} str
 * @param {Object} options
 * @return {String}
 * @api public
 */

module.exports = function(str, options) {
  options = options || {};
  if ('object' !== typeof options)
    throw new Error('options must be an object');

  return compile(parse(importer(lexer(str), options.resolver)));
};
