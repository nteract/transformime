"use strict";

import {RendererBase} from './rendererbase';

export class TextRenderer extends RendererBase {
    get mimetype() {
        return 'text/plain';
    }

    transform(data, parentDoc) {
        var el = (parentDoc || document).createElement('div');
        el.textContent = data;
        return el;
    }
}
