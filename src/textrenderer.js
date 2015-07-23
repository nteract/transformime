"use strict";

import {TransformerBase} from './rendererbase';

export class TextRenderer extends TransformerBase {
    get mimetype() {
        return 'text/plain';
    }

    transform(data, doc) {
        var el = doc.createElement('pre');
        el.textContent = data;
        return el;
    }
}
