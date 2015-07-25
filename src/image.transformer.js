"use strict";

import {TransformerBase} from './transformer-base';

/**
 * Converts b64 image mimetypes to img elements.
 */
export class ImageTransformer extends TransformerBase {
    constructor(mimetype) {
        super();
        this._mimetype = mimetype;
    }

    get mimetype() {
        return this._mimetype;
    }

    set mimetype(mimetype) {
       this._mimetype = mimetype;
    }

    transform(data, doc) {
        let img = doc.createElement('img');
        img.src = 'data:' + this.mimetype + ';base64,'+ data;
        return img;
    }
}
