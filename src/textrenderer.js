"use strict";

import {RendererBase} from './rendererbase';

export class TextRenderer extends RendererBase {
    get mimetype() {
        return 'text/plain';
    }

    transform(data, doc) {
        var el = doc.createElement('pre');
        el.textContent = data;
        return Promise.resolve(el);
    }
}
