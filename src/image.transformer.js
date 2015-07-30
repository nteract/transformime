"use strict";

/**
 * Converts b64 image mimetypes to img elements.
 */
export function ImageTransformer(data, doc) {
    let img = doc.createElement('img');
    img.src = 'data:' + this.mimetype + ';base64,'+ data;
    return img;
}
