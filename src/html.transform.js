'use strict'

export function HTMLTransform (mimetype, data, document) {
  try {
    var range = document.createRange()
    return range.createContextualFragment(data)
  } catch (error) {
    console.warn('Environment does not support Range ' +
                 'createContextualFragment, falling back on innerHTML')
    var div = document.createElement('div')
    div.innerHTML = data
    return div
  }

}
HTMLTransform.mimetype = 'text/html'
