"use strict";

import {RendererBase} from './rendererbase';

export class HTMLRenderer extends RendererBase {
    get mimetype() {
        return 'text/html';
    }

    transform(data, doc) {
        var el = doc.createElement('div');
        // TODO: Pull scripts from inside, create elements for them
        el.innerHTML = data;
        return Promise.resolve(el);
    }
}
