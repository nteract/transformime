'use strict'

/**
 * Converts b64 image mimetypes to img elements.
 */
export function ImageTransform (mimetype, data, document) {
  let img = document.createElement('img')
  img.src = 'data:' + mimetype + ';base64,' + data
  return img
}
ImageTransform.mimetype = ['image/png', 'image/jpeg', 'image/gif']
