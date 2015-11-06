'use strict'

export function HTMLTransformer (mimetype, data, document) {
  var em = document.createElement('embed')
  var URL = document.defaultView.URL
  var Blob = document.defaultView.Blob
  em.src = URL.createObjectURL(new Blob([data], {type: mimetype}))
  return em
}
HTMLTransformer.mimetype = 'text/html'
