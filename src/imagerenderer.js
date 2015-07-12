"use strict";

import {RendererBase} from './rendererbase';
import {btoa} from 'btoa';

export class ImageRenderer extends RendererBase {
    constructor(mimetype, b64) {
        this._mimetype = mimetype;
        this._b64 = b64 || false;
    }
    
    get mimetype() {
        return this._mimetype;
    }

    transform(data, parentDoc) {
        let img = (parentDoc || document).createElement('img');
        let b64data = this._b64 ? data : btoa(data);
        img.src = 'data:' + this.mimetype + ';base64,'+ data;
        return img;
    }
}
