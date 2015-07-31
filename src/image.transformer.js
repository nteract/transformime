"use strict";

/**
 * Converts b64 image mimetypes to img elements.
 */
export function ImageTransformer(data, mimetype, document) {
    let img = document.createElement('img');
    img.src = 'data:' + mimetype + ';base64,'+ data;
    return img;
}
ImageTransformer.mimetype = ['image/png', 'image/jpeg', 'image/gif'];
