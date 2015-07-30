"use strict";

import {TextTransformer} from './text.transformer';
import {ImageTransformer} from './image.transformer';
import {HTMLTransformer} from './html.transformer';
/**
 * Transforms mimetypes into HTMLElements
 */
class Transformime {

    /**
     * Public constructor
     * @param  {function[]} transformers - list of transformers, in reverse priority order.
     */
    constructor(transformers) {

        // Initialize instance variables.
        if (transformers) {
            this.transformers = transformers;
        } else {
            this.push(TextTransformer);
            this.push(ImageTransformer, 'image/png');
            this.push(ImageTransformer, 'image/jpeg');
            this.push(ImageTransformer, 'image/gif');
            this.push(HTMLTransformer);
        }
    }

    /**
     * Transforms a mime bundle, using the richest available representation,
     * into an HTMLElement.
     * @param  {any}      bundle - {mimetype1: data1, mimetype2: data2, ...}
     * @param  {Document} document - Any of window.document, iframe.contentDocument
     * @return {Promise<{mimetype: string, el: HTMLElement}>}
     */
    transformRichest(bundle, document) {
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
            if (transformer.mimetype && transformer.mimetype in bundle) {
                richTransformer = transformer;
            }
        }

        if (richTransformer){
            let mimetype = richTransformer.mimetype;
            return this.transform(bundle[mimetype], mimetype, document);
        }

        return Promise.reject(new Error('Transformer(s) for ' + Object.keys(bundle).join(', ') + ' not found.'));
    }

    /**
     * Transforms a specific mime type into an HTMLElement.
     * @param  {any} data - Raw data
     * @param  {string} mimetype - MIME type (e.g. text/html, image/png)
     * @param  {Document} document - Any of window.document, iframe.contentDocument
     * @return {Promise<{mimetype: string, el: HTMLElement}>}
     */
    transform(data, mimetype, document) {
        let transformer = this.get(mimetype);
        if (transformer) {
            // Don't assume the transformation will return a promise.  Also
            // don't assume the transformation will succeed.
            try {
                return Promise.resolve({el: transformer.transform(data, document)});
            } catch (e) {
                return Promise.reject(e);
            }
        }

        return Promise.reject(new Error('Transformer for mimetype ' + mimetype + ' not found.'));
    }
    
    /**
     * Deletes all transformers by mimetype.
     * @param {string} mimetype - mimetype the data type (e.g. text/plain, text/html, image/png)
     */
    del(mimetype) {
        for (let i = 0; i < this.transformers.length; i++) {
            if (mimetype === this.transformers[i].mimetype) {
                delete this.transformers[i];
                i--;
            }
        }
    }

    /**
     * Gets a transformer matching the mimetype
     * @param {string} mimetype - the data type (e.g. text/plain, text/html, image/png)
     * @return {function} Matching transformer
     */
    get(mimetype) {
        for (let transformer of this.transformers) {
            if (mimetype === transformer.mimetype) {
                return transformer;
            }
        }
    }

    /**
     * Sets a transformer matching the mimetype
     * @param {string|} mimetype - the data type (e.g. text/plain, text/html, image/png)
     * @param {function} transformer
     * @return {function} inserted transformer function (may be different than arg)
     */
    set(mimetype, transformer) {
        this.del(mimetype);
        return this.push(transformer, mimetype);
    }
    
    /**
     * Appends a transformer to the transformer list.
     * @param  {function} transformer
     * @param  {string} mimetype
     * @return {function} inserted transformer function (may be different than arg)
     */
    push(transformer, mimetype) {
        // If the mimetype specified is different than the mimetype of the
        // transformer, make a copy of the transformer and set the new mimetype
        // on the copy.
        if (mimetype && transformer.mimetype !== mimetype) {
            transformer = (...args) => transformer(...args);
            transformer.mimetype = mimetype;
        }
        
        // Verify a mimetype is set on the transformer.
        if (!transformer.mimetype) throw Error('Could not infer transformer mimetype');
        
        this.transformers.push(transformer);
        return transformer;
    }
}

export default {Transformime, TextTransformer, ImageTransformer, HTMLTransformer};
