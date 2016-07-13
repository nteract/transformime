"use strict"


/**
 * Transform a given javascript into a script html element
 *
 * @param {string} mimetype - The mimetype of the data to be transformed,
 * it is used by this element to define the type of the HTML element.
 * @param {string} value - The script to be transformed.
 * @param {Document} document - A Document Object Model to be used for
 * creating an html img element.
 * @return {HTMLElement} - A scriopt element for the given javascript
 */

export function ScriptTransform(mimetype, value, document) {
    var el = document.createElement('script')
    el.type = mimetype
    el.appendChild(document.createTextNode(value))
    return el
}
ScriptTransform.mimetype = ['text/javascript', 'application/javascript']
