"use strict";

export function HTMLTransformer(data, mimetype, document) {
    var el = document.createElement('div');
    // TODO: Pull scripts from inside, create elements for them
    el.innerHTML = data;
    return el;
}
HTMLTransformer.mimetype = 'text/html';
