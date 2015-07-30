"use strict";

export function HTMLTransformer(data, doc) {
    var el = doc.createElement('div');
    // TODO: Pull scripts from inside, create elements for them
    el.innerHTML = data;
    return el;
}
HTMLTransformer.mimetype = 'text/html';
