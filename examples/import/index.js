
/**
 * Module dependencies.
 */

var fs = require('fs')
  , compile = require('../..')
  , read = fs.readFileSync

// file resolver
var resolver = require('./styl-resolver');

var str = read('examples/import/example.styl', 'utf8');
var css = compile(str, { resolver: resolver(__dirname) });
console.log(css);