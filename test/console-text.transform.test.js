var tape = require('tape')
var Transformime = require('../src/transformime').Transformime
var ConsoleTextTransform = require('../src/transformime').ConsoleTextTransform

var tf

function beforeEach () {
  tf = new Transformime()
  tf.transformers = []
  tf.push(ConsoleTextTransform)
}

tape('should have the jupyter/console-text mimetype', function (t) {
  beforeEach()
  t.equal(ConsoleTextTransform.mimetype, 'jupyter/console-text')
  t.end()
})

tape('transform should create a pre and handle ANSI colors', function (t) {
  beforeEach()
  var consoleText = 'There is no text but \x1b[01;41;32mtext\x1b[00m.\nWoo.'
  var plainText = 'There is no text but text.\nWoo.'
  var innerHTML = 'There is no text but <span style="color:rgb(0, 255, 0);background-color:rgb(187, 0, 0)">text</span>.\nWoo.'
  var transformed = tf.transform({'jupyter/console-text': consoleText}, document)
  return transformed.then(results => {
    t.equal(results.el.innerHTML, innerHTML)
    t.equal(results.el.textContent, plainText)
    t.equal(results.el.localName, 'pre')
    t.end()
  })
})
