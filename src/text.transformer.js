"use strict";

export function TextTransformer(data, mimetype, document) {
    var el = document.createElement('pre');
    el.textContent = data;
    return el;
}
TextTransformer.mimetype = 'text/plain';
