# transformime

[![Build Status](https://travis-ci.org/nteract/transformime.svg)](https://travis-ci.org/nteract/transformime)

![Optimus MIME](https://cloud.githubusercontent.com/assets/6437976/8895696/db154a04-3397-11e5-91ca-296b957658a6.png)

Transforms MIMEtype+data to HTML Elements

Intended to be used in context of Jupyter and IPython projects, particularly by display areas.

## Installation

```
npm install transformime
```

## Usage

Transformime works in the browser (via browserify) and with jsdom!

It returns promises for all the HTMLElements.

### Transform a single mimetype

```javascript
> // In node we'll need a DOM to work with
> var document = require('jsdom').jsdom();
> // For browsers, they can pass document around (or an iframe's contentDocument)
> var transformime = new require('transformime').Transformime;
> var p1 = transformime.transform("<h1>Woo</h1>", "text/html", document);
> p1.then(function(result){
...   console.log(result.el.innerHTML);
...   console.log(result.el.textContent)
... });
<h1>Woo</h1>
Woo
```

Images get handled as base64 encoded data and become embedded elements.

```javascript
> // Send an image over
> p2 = transformime.transform("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "image/png", document)
> p2.then(function(result){
...     console.log(result.el.src);
... })
data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7
```

### Transform the richest element
```javascript
> var mimes = {'text/html': "<code>import this</code>", 'text/plain': "import this"}
> var p3 = transformime.transformRichest(mimes, document);
> p3.then(function(result){
...    console.log(result.mimetype + ": " + result.el.innerHTML)
... })
text/html: <code>import this</code>
```

### Working with iframes

```javascript
> // Assume document is defined (either in browser or from jsdom) as well as transformer
> // Create an arbitrary iframe and slap it in the body of the document
> var iframe = document.createElement("iframe");
> document.querySelector('body').appendChild(iframe);
> var idoc = iframe.contentDocument;
> var p5 = transformime.transform('<h1>mimetic</h1>', "text/html", idoc);
> p5.then(function(result){
... idoc.querySelector('body').appendChild(result.el);
... })
> idoc.querySelector('body').innerHTML
'<div><h1>mimetic</h1></div>'
```

## Development

```
git clone https://github.com/nteract/transformime
cd transformime
npm install
npm run build
```
