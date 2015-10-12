'use strict'

export function TextTransformer (mimetype, data, document) {
  var el = document.createElement('pre')
  el.textContent = data
  return el
}
TextTransformer.mimetype = 'text/plain'
