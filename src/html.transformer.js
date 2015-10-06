'use strict'

var got = require('got')

export function HTMLTransformer (mimetype, data, document) {
  var el = document.createElement('div')
  el.innerHTML = data
  var scripts = el.getElementsByTagName('script')
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src) {
      got(scripts[i].src, function (err, data) {
        if (err) console.error(err)
        else eval(data)
      })
    } else {
      eval(scripts[i].innerHTML)
    }
  }

  return el
}
HTMLTransformer.mimetype = 'text/html'
