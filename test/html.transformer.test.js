var test = require('tape')

// wtf babel i dont know
var Transformime = require('../lib/transformime').Transformime
var HTMLTransformer = require('../lib/transformime').HTMLTransformer;

var tf

test('html transformer', function (t) {

  test('should have the text/html mimetype', function(t) {
    beforeEach()
    t.equals(HTMLTransformer.mimetype, 'text/html', 'has corret mime type');
    t.end()
  });

  test('should create a div with all the passed in elements', function(t) {
    beforeEach()
    var htmlText = "<h1>This is great</h1>";
    return tf.transform({'text/html': htmlText}, document).then(results => {
        t.equals(results.el.innerHTML, htmlText, 'inner text should be there');
        t.equals(results.el.localName, "div", 'div node is there');
        t.end()
    });
  });

  test('should execute script tag', function(t) {
    beforeEach()
    var htmlText = "<script>window.y=3;</script>"
    return tf.transform({'text/html': htmlText}, document).then(results => {
        t.equals(results.el.localName, "div", 'div node is there');
        t.equals(window.y, 3)
        t.end()
    });
  });

  function beforeEach () {
    tf = new Transformime();
    tf.transformers = [];
    tf.push(HTMLTransformer);
  };

  t.end()

})
