'use strict'

export function HTMLTransform (mimetype, data, document) {
  var range = document.createRange()
  return range.createContextualFragment(data)
}
HTMLTransform.mimetype = 'text/html'
