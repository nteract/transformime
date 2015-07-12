"use strict";

import {RendererBase} from './rendererbase';

export class HTMLRenderer extends RendererBase {
    get mimetype() {
        return 'text/html';
    }

    transform(data, parentDoc) {
        var el = (parentDoc || document).createElement('div');
        // TODO: Pull scripts from inside, create elements for them
        el.innerHTML = data;
        return el;
    }
}
