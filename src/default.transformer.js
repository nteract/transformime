"use strict";

import {TransformerBase} from './transformer-base';

export class DefaultTransformer extends TransformerBase {
    get mimetype() {
        return 'unknown';
    }

    transform(data, doc) {
        var el = doc.createElement('div');
        el.textContent = JSON.stringify(data);
        return el;
    }
}
