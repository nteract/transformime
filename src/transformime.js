"use strict";

import {TextTransformer} from './textrenderer';
import {DefaultTransformer} from './defaultrenderer';
import {ImageTransformer} from './imagerenderer';
import {HTMLTransformer} from './htmlrenderer';

/**
 * Transforms mimetypes into HTMLElements
 */
export class Transformime {

    /**
     * Public constructor
     * @param  {TransformerBase[]} renderers       list of renderers, in reverse
     *                                          priority order
     * @param  {TransformerBase} fallbackTransformer  renderer to default to when a
     *                                          mimetype is unsupported
     */
    constructor(renderers, fallbackTransformer) {

        // Initialize instance variables.
        this.renderers = renderers || [
            new TextTransformer(),
            new ImageTransformer('image/png'),
            new ImageTransformer('image/jpeg'),
            new HTMLTransformer()
        ];
        this.fallbackTransformer = fallbackTransformer || new DefaultTransformer();
    }

    /**
     * Transforms a mime bundle, using the richest available representation,
     * into an HTMLElement. Uses fallback renderer otherwise.
     * @param  {any}      bundle {mimetype1: data1, mimetype2: data2, ...}
     * @param  {Document} doc    Any of window.document, iframe.contentDocument
     * @return {Promise<HTMLElement>}
     */
    transformRichest(bundle, doc) {
        let element;
        let richTransformer = this.fallbackTransformer;

        // Choose the last renderer as the most rich
        for (let renderer of this.renderers) {
            if (renderer.mimetype in bundle) {
                richTransformer = renderer;
            }
        }

        if (richTransformer){
            let data = bundle[richTransformer.mimetype];
            return this.transform(data, richTransformer.mimetype, doc);
        }

        return Promise.reject(new Error('Transformer(s) for ' + Object.keys(bundle).join(', ') + ' not found.'));
    }

    /**
     * Transforms all of the mime types in a mime bundle into HTMLElements.
     * @param  {any}      bundle {mimetype1: data1, mimetype2: data2, ...}
     * @param  {Document} doc    Any of window.document, iframe.contentDocument
     * @return {Promise<HTMLElement[]>}
     */
    transformAll(bundle, doc) {
        var promises = bundle.map(function(mimetype) { return this.transformMimetype(bundle[mimetype], mimetype, doc); });
        return Promise.all(promises);
    }

    /**
     * Transforms a specific mime type into an HTMLElement. Uses the fallback
     * renderer if unable to get find the right one.
     * @param  {any}    data     Raw data
     * @param  {string} mimetype MIME type (e.g. text/html, image/png)
     * @return {Promise<HTMLElement>}
     */
    transform(data, mimetype, doc) {
        let renderer = this.getTransformer(mimetype);
        // TODO: Handle the fallbackTransformer case
        if (renderer) {
            // Don't assume the transformation will return a promise.  Also
            // don't assume the transformation will succeed.
            try {
                return Promise.resolve(renderer.transform(data, doc || document));
            } catch (e) {
                return Promise.reject(e);
            }
        }

        return Promise.reject(new Error('Transformer for mimetype ' + mimetype + ' not found.'));
    }

    /**
     * Gets a renderer matching the mimetype
     * @param  string mimetype the data type (e.g. text/plain, text/html, image/png)
     * @return {TransformerBase} Matching renderer
     */
    getTransformer(mimetype) {
        for (let renderer of this.renderers) {
            if (mimetype === renderer.mimetype) {
                return renderer;
            }
        }
        return null;
    }
}
