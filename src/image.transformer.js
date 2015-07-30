"use strict";

/**
 * Converts b64 image mimetypes to img elements.
 */
export function ImageTransformer(data, document) {
    let img = document.createElement('img');
    img.src = 'data:' + this.mimetype + ';base64,'+ data;
    return img;
}
