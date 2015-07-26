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
     */
    constructor(transformers) {

        // Initialize instance variables.
        this.transformers = transformers || [
            new TextTransformer(),
            new ImageTransformer('image/png'),
            new ImageTransformer('image/jpeg'),
            new HTMLTransformer()
        ];
    }

    /**
     * Transforms a mime bundle, using the richest available representation,
     * into an HTMLElement.
     * @param  {any}      bundle {mimetype1: data1, mimetype2: data2, ...}
     * @param  {Document} doc    Any of window.document, iframe.contentDocument
     * @return {Promise<Object>}
     */
    transformRichest(bundle, doc) {
        let element;

        if (this.transformers.length <= 0) {
            // Empty transformers
            return Promise.reject(new Error("No transformers configured"));
        }

        if (Object.keys(bundle).length <= 0) {
            return Promise.reject(new Error("MIME Bundle empty"));
        }

        let richTransformer;

        // Choose the last transformer as the most rich
        for (let transformer of this.transformers) {
            if (transformer.mimetype in bundle) {
                richTransformer = transformer;
            }
        }

        if (richTransformer){
            let mimetype = richTransformer.mimetype;
            return this.transformRetainMimetype(bundle[mimetype], mimetype, doc);
        }

        return Promise.reject(new Error('Transformer(s) for ' + Object.keys(bundle).join(', ') + ' not found.'));
    }

    /**
     * transformRetainMimetype is just like transform except it returns an
     * object with both the mimetype and the element
     * {"mimetype": mimetype, "el": el}
     *
     * @param  {any} data        Raw data
     * @param  {string} mimetype Standard Mime type for the data
     * @param  {Document} doc    The DOM to own the element
     * @return {Object}          {"mimetype": mimetype, "el": el}
     */
    transformRetainMimetype(data, mimetype, doc) {
        var prom = this.transform(data, mimetype, doc);
        return prom.then(el => {
            return {
                "mimetype": mimetype,
                "el": el
            };
        });
    }

    /**
     * Transforms all of the mime types in a mime bundle into HTMLElements.
     * @param  {any}      bundle {mimetype1: data1, mimetype2: data2, ...}
     * @param  {Document} doc    Any of window.document, iframe.contentDocument
     * @return {Promise<Object[]>}
     */
    transformAll(bundle, doc) {
        var mimetypes = Object.keys(bundle);
        var promises = mimetypes.map( mimetype => {
            return this.transformRetainMimetype(bundle[mimetype], mimetype, doc);
        });
        return Promise.all(promises);
    }

    /**
     * Transforms a specific mime type into an HTMLElement.
     * @param  {any}    data     Raw data
     * @param  {string} mimetype MIME type (e.g. text/html, image/png)
     * @return {Promise<HTMLElement>}
     */
    transform(data, mimetype, doc) {
        let transformer = this.getTransformer(mimetype);
        if (transformer) {
            // Don't assume the transformation will return a promise.  Also
            // don't assume the transformation will succeed.
            try {
                return Promise.resolve(transformer.transform(data, doc));
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
    }
}

export default {Transformime, TransformerBase, TextTransformer, DefaultTransformer, ImageTransformer, HTMLTransformer};
