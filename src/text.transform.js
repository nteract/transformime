"use strict"

var Anser = require('anser')

export function TextTransform(mimetype, value, document) {
  var el = document.createElement('pre')
  var esc = Anser.escapeForHtml(value)
  el.innerHTML = Anser.ansiToHtml(esc)
  return el
}
TextTransform.mimetype = ['text/plain', 'jupyter/console-text']
