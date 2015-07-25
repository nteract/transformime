"use strict";

import {TransformerBase} from './transformer-base';

export class TextTransformer extends TransformerBase {
    get mimetype() {
        return 'text/plain';
    }

    transform(data, doc) {
        var el = doc.createElement('pre');
        el.textContent = data;
        return el;
    }
}
