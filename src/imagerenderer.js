"use strict";

import {RendererBase} from './rendererbase';
import {btoa} from 'btoa';

export class ImageRenderer extends RendererBase {
    constructor(mimetype, b64) {
        this.mimetype = mimetype;
        this.b64 = b64 || false;
    }

    transform(data, doc) {
        let img = (doc || document).createElement('img');
        let b64data = this.b64 ? data : btoa(data);
        img.src = 'data:' + this.mimetype + ';base64,'+ data;
        return img;
    }
}
