"use strict";

/**
 * Base class for Transformers. As long as a transformer adheres to this
 * interface, transformime will play happily (you don't have to extend from this
 * class)
 */
export class TransformerBase {
    /**
     * The mimetype for this transformer
     * @return {string} mimetype (e.g. 'text/html', 'image/png', etc.)
     */
    get mimetype() {
        throw new Error('mimetype not implemented');
    }

    /**
     * Turns a data type into an HTML Element on a document
     * @param  {any} data           Data this transformer expects
     * @param  {Document} document  A DOM (window.document, JSDom, iframe.contentDocument)
     * @return {HTMLElement}        Representation of [data] as an HTMLElement
     */
    transform(data, document) {
        throw new Error('transform not implemented');
    }
}
