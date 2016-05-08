"use strict"

var ansi_up = require('ansi_up')

export function ConsoleTextTransform(mimetype, value, document) {
  var el = document.createElement('pre')
  var esc = ansi_up.escape_for_html(value)
  el.innerHTML = ansi_up.ansi_to_html(esc)
  return el
}
ConsoleTextTransform.mimetype = 'jupyter/console-text'
