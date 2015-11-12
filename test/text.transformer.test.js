var tape = require('tape')
var Transformime = require('../src/transformime').Transformime
var TextTransformer = require('../src/transformime').TextTransformer

var tf

function beforeEach () {
  tf = new Transformime()
  tf.transformers = []
  tf.push(TextTransformer)
}

tape('should have the text/plain mimetype', function (t) {
  beforeEach()
  t.equal(TextTransformer.mimetype, 'text/plain')
  t.end()
})

tape('transform should create a pre with all the passed in elements', function (t) {
  beforeEach()
  var text = 'There is no text but text.\nWoo.'
  var transformed = tf.transform({'text/plain': text}, document)
  return transformed.then(results => {
    t.equal(results.el.innerHTML, text)
    t.equal(results.el.textContent, text)
    t.equal(results.el.localName, 'pre')
    t.end()
  })
})
