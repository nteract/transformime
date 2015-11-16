'use strict'

export function TextTransform (mimetype, data, document) {
  var el = document.createElement('pre')
  el.textContent = data
  return el
}
TextTransform.mimetype = 'text/plain'
