"use strict";

import {RendererBase} from './rendererbase';

export class TextRenderer extends RendererBase {
    get mimetype() {
        return 'text/plain';
    }

    transform(data, doc) {
        var el = (doc || document).createElement('div');
        el.textContent = data;
        return el;
    }
}
