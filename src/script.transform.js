"use strict";

export function ScriptTransform(mimetype, value, document) {
    var el = document.createElement('script');
    el.type = mimetype;
    el.appendChild(document.createTextNode(value));
    return el;
}
ScriptTransform.mimetype = ['text/javascript', 'application/javascript'];
