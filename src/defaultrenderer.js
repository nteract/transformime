(function () { 'use strict'; }());

import {RendererBase} from './rendererbase';

export class DefaultRenderer extends RendererBase {
    get mimetype() {
        return 'unknown';
    }

    render(data) {
        var el = document.createElement('div');
        el.textContent = JSON.stringify(data);
        return el;
    }
}
