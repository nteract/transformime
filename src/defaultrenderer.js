"use strict";

import {TransformerBase} from './rendererbase';

export class DefaultRenderer extends TransformerBase {
    get mimetype() {
        return 'unknown';
    }

    transform(data, doc) {
        var el = doc.createElement('div');
        el.textContent = JSON.stringify(data);
        return el;
    }
}
