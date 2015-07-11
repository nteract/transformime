"use strict";

import {RendererBase} from './rendererbase';

export class HTMLRenderer extends RendererBase {
    get mimetype() {
        return 'text/html';
    }

    render(data) {
        var el = document.createElement('div');
        // TODO: Pull scripts from inside, create elements for them
        el.innerHTML = data;
        return el;
    }
}
