# transformime

[![Build Status](https://travis-ci.org/nteract/transformime.svg)](https://travis-ci.org/nteract/transformime)

![Optimus MIME](https://cloud.githubusercontent.com/assets/836375/8655086/6afd9854-2954-11e5-8427-05d7c4153b3d.png)

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
> var Transformime = require('transformime').Transformime;
> var transformer = new Transformime();
> var p1 = transformer.transform("<h1>Woo</h1>", "text/html", document);
> p1.then(function(el){
...   console.log(el.innerHTML);
...   console.log(el.textContent)
... });
<h1>Woo</h1>
Woo
```

Images get handled as base64 encoded data and become embedded elements.

```javascript
> // Send an image over
> p2 = transformer.transform("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "image/png", document)
> p2.then(function(el){
...     console.log(el.src);
... })
data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7
```

### Transform the richest element
```javascript
> var mimes = {'text/html': "<code>import this</code>", 'text/plain': "import this"}
> var p3 = transformer.transformRichest(mimes, document);
> p3.then(function(bundle){
...    console.log(bundle.mimetype + ": " + bundle.el.innerHTML)
... })
text/html: <code>import this</code>
```

### Transform all elements
```javascript
> var mimes = {'text/html': "<code>import this</code>", 'text/plain': "import this"}
> var p4 = transformer.transformAll(mimes, document);
> p4.then(function(arr) {
...   arr.forEach(function(bundle) {
...     console.log(bundle.mimetype + ": " + bundle.el.innerHTML);
...   });
... });
text/html: <code>import this</code>
text/plain: import this
```

### Working with iframes

```javascript
> // Assume document is defined (either in browser or from jsdom) as well as transformer
> // Create an arbitrary iframe and slap it in the body of the document
> var iframe = document.createElement("iframe");
> document.querySelector('body').appendChild(iframe);
> var idoc = iframe.contentDocument;
> var p5 = transformer.transform('<h1>mimetic</h1>', "text/html", idoc);
> p5.then(function(el){
... idoc.querySelector('body').appendChild(el);
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
