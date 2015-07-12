"use strict";

import {RendererBase} from './rendererbase';

/**
 * Converts b64 image mimetypes to img elements.
 */
export class ImageRenderer extends RendererBase {
    constructor(mimetype) {
        super();
        this.mimetype = mimetype;
    }

    transform(data, doc) {
        let img = doc.createElement('img');
        img.src = 'data:' + this.mimetype + ';base64,'+ data;
        return img;
    }
}
