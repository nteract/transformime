"use strict";

export function TextTransformer(data, doc) {
    var el = doc.createElement('pre');
    el.textContent = data;
    return el;
}
TextTransformer.mimetype = 'text/plain';
