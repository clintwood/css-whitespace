/**
 * Module dependencies.
 */

var debug = require('debug')('css-whitespace:import');
var lexer = require('./lexer');

/**
 * Visit `toks`, calling resolver for each @import.
 *
 * @param {Array} toks
 * @param {Function(String):String} resolver
 * @return {Array}
 * @api private
 */

module.exports = function(toks, resolver) {
  if (!resolver) return toks;

  if ('function' !== typeof resolver)
    throw new Error('resolver must be a function');

  var cache = {};
  var maxDepth = 10;

  return visit(toks, resolver);

  /**
   * Visit `toks` - allows recursive/nested imports
   *
   * @param {Array} toks
   * @param {Function(String):String} resolver
   * @return {Array}
   * @api private
   */
  function visit(toks, resolver) {
    if (!maxDepth--)
      throw new Error('max @import depth reached');

    var tokens = [];

    // visit tokens
    var last = 0;
    var toksLen = toks.length;
    for (var i = 0; i < toksLen; i++) {
      if ('rule' == toks[i][0] && toks[i][1][0]) {
        var match = toks[i][1][0].match(/^@import\s+(.+)$/);
        if (match) {
          var itoks;
          var path = match[1];
          // try pull from cache
          if (path in cache) {
            itoks = cache[path];
          } else {
            // if not cached handoff to resolver
            var istr = resolver(path);
            if (istr) {
              itoks = lexer(istr);
              itoks = itoks.slice(0, itoks.length - 1); // don't want 'eos' token
              debug('@import ' + path + '; - resolved.');
            } else {
              itoks = null;
              debug('@import ' + path + '; - not resolved.');
            }
            cache[path] = itoks;
          }
          // splice new tokens
          if (itoks) {
            // recurse for imports in itoks
            itoks = visit(itoks, resolver);
            // replace @import rule tokens with itoks
            tokens.push.apply(tokens, toks.slice(last, i));
            tokens.push.apply(tokens, itoks);
            last = i + 1; // move last
            //toksLen += itoks.length - 1; // fix length
          }
        }
      }
    }

    // remaining
    if (last < toks.length)
      tokens.push.apply(tokens, toks.slice(last));

    maxDepth++;
    return tokens;
  }
}