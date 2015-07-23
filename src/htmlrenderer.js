"use strict";

import {TransformerBase} from './rendererbase';

export class HTMLRenderer extends TransformerBase {
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
