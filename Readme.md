# css-whitespace

  Whitespace significant CSS to regular CSS. Typically used for [Rework](https://github.com/visionmedia/rework),
  however you may use it on its own if you like.

## Installation

```
$ npm install css-whitespace
$ component install visionmedia/css-whitespace
```

## API

```js
var compile = require('css-whitespace');
var css = compile('body\n  color: #888\n');
```
or with optional @import importer/resolver (see [examples/import](examples/import))
```
var compile = require('css-whitespace');
var resolver = require('./styl-resolver.js');
var css = compile('body\n  @import colors\n', { resolver: resolver(__dirname) });
```

## Example

```css
/* main.styl */
body
  padding: 50px
  background: black
  color: white

```
```css

@charset "utf-8"

@import "foo.css"

@import main

form
  button
    border-radius: 5px
    padding: 5px 10px

@media print
  body
    padding: 0

  button
    border-radius: 0
    width: 100%
```

yields:

```css
@charset "utf-8";

@import "foo.css";

/* main.styl */
body {
  padding: 50px;
  background: black;
  color: white;
}

form button {
  border-radius: 5px;
  padding: 5px 10px;
}

@media print {
  body {
    padding: 0;
  }
  button {
    border-radius: 0;
    width: 100%;
  }
}
```

## License

  MIT
