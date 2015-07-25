"use strict";

import {TransformerBase} from './transformer-base';
import {TextTransformer} from './text.transformer';
import {DefaultTransformer} from './default.transformer';
import {ImageTransformer} from './image.transformer';
import {HTMLTransformer} from './html.transformer';
/**
 * Transforms mimetypes into HTMLElements
 */
class Transformime {

    /**
     * Public constructor
     * @param  {TransformerBase[]} transformers       list of transformers, in reverse
     *                                          priority order
     * @param  {TransformerBase} fallbackTransformer  transformer to default to when a
     *                                          mimetype is unsupported
     */
    constructor(transformers, fallbackTransformer) {

        // Initialize instance variables.
        this.transformers = transformers || [
            new TextTransformer(),
            new ImageTransformer('image/png'),
            new ImageTransformer('image/jpeg'),
            new HTMLTransformer()
        ];
        this.fallbackTransformer = fallbackTransformer || new DefaultTransformer();
    }

    /**
     * Transforms a mime bundle, using the richest available representation,
     * into an HTMLElement. Uses fallback transformer otherwise.
     * @param  {any}      bundle {mimetype1: data1, mimetype2: data2, ...}
     * @param  {Document} doc    Any of window.document, iframe.contentDocument
     * @return {Promise<HTMLElement>}
     */
    transformRichest(bundle, doc) {
        let element;
        let richTransformer = this.fallbackTransformer;

        // Choose the last transformer as the most rich
        for (let transformer of this.transformers) {
            if (transformer.mimetype in bundle) {
                richTransformer = transformer;
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
        var mimetypes = Object.keys(bundle);
        var promises = mimetypes.map( mimetype => { return this.transform(bundle[mimetype], mimetype, doc); });
        return Promise.all(promises);
    }

    /**
     * Transforms a specific mime type into an HTMLElement. Uses the fallback
     * transformer if unable to get find the right one.
     * @param  {any}    data     Raw data
     * @param  {string} mimetype MIME type (e.g. text/html, image/png)
     * @return {Promise<HTMLElement>}
     */
    transform(data, mimetype, doc) {
        let transformer = this.getTransformer(mimetype);
        // TODO: Handle the fallbackTransformer case
        if (transformer) {
            // Don't assume the transformation will return a promise.  Also
            // don't assume the transformation will succeed.
            try {
                return Promise.resolve(transformer.transform(data, doc || document));
            } catch (e) {
                return Promise.reject(e);
            }
        }

        return Promise.reject(new Error('Transformer for mimetype ' + mimetype + ' not found.'));
    }

    /**
     * Gets a transformer matching the mimetype
     * @param  string mimetype the data type (e.g. text/plain, text/html, image/png)
     * @return {TransformerBase} Matching transformer
     */
    getTransformer(mimetype) {
        for (let transformer of this.transformers) {
            if (mimetype === transformer.mimetype) {
                return transformer;
            }
        }
        return null;
    }
}

export default {Transformime, TransformerBase, TextTransformer, DefaultTransformer, ImageTransformer, HTMLTransformer};
