"use strict";

import {RendererBase} from './rendererbase';

export class DefaultRenderer extends RendererBase {
    get mimetype() {
        return 'unknown';
    }

    transform(data, doc) {
        var el = doc.createElement('div');
        el.textContent = JSON.stringify(data);
        return el;
    }
}
