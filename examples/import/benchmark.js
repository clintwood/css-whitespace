
/**
 * Module dependencies.
 */

var fs = require('fs')
  , compile = require('../..')
  , read = fs.readFileSync

// file resolver
var resolver = require('./styl-resolver');

var str = read(__dirname + '/benchmark.styl', 'utf8');
var start = new Date;
var css = compile(str, { resolver: resolver(__dirname) });

console.log();
console.log('  duration: %dms', new Date - start);
console.log('  lines: %d', str.split('\n').length);
console.log('  size: %dkb', css.length / 1024 | 0);
console.log();