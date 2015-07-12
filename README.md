# transformime

[![Build Status](https://travis-ci.org/nteract/transformime.svg)](https://travis-ci.org/nteract/transformime)

Transforms MIMEtype+data to HTML Elements

Intended to be used in context of Jupyter and IPython projects, particularly by display areas.

## Development

```
git clone https://github.com/nteract/transformime
cd transformime
npm install
npm run build
```

## Usage

Transformime works with jsdoc and the browser (once transpiled).

Note that the examples below use `babel-node` and work from a git clone.

### Using with jsdom

```javascript
> var jsdom = require('jsdom')
> var document = jsdom.jsdom()
> var Transformime = require('./src/transformime').Transformime;
> var transformer = new Transformime();
> var el = transformer.transform("<h1>Woo</h1>", "text/html", document)
> el.innerHTML
'<h1>Woo</h1>'
> el.textContent
'Woo'
```

Images get handled as base64 encoded data and become embedded elements.

```javascript
> // Send an image over
> el = transformer.transform("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "image/png", document)
> el.src
'data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
```

### Working with iframes

```javascript
> // Assume document is defined (either in browser or from jsdoc) as well as transformer
> // Create an arbitrary iframe and slap it in the body of the document
> var iframe = document.createElement("iframe");
> document.querySelector('body').appendChild(iframe);
> var idoc = iframe.contentDocument;
> var el = transformer.transform('<h1>mimetic</h1>', "text/html", idoc);
> idoc.querySelector('body').appendChild(el);
> idoc.querySelector('body').innerHTML
'<div><h1>mimetic</h1></div>'
```

