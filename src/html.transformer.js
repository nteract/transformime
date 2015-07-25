"use strict";

import {TransformerBase} from './transformer-base';

export class HTMLTransformer extends TransformerBase {
    get mimetype() {
        return 'text/html';
    }

    transform(data, doc) {
        var el = doc.createElement('div');
        // TODO: Pull scripts from inside, create elements for them
        el.innerHTML = data;
        return el;
    }
}
