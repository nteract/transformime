'use strict'

export function HTMLTransformer (mimetype, data, document) {
  var range = document.createRange()
  return range.createContextualFragment(data)
}
HTMLTransformer.mimetype = 'text/html'
