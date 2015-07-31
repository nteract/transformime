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
        this.transformers = [];
        this.push(TextTransformer);
        this.push(ImageTransformer);
        this.push(HTMLTransformer);
        transformers.map((transformer) => this.push(transformer));
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
            if (transformer.mimetype) {
                
                // Make sure the transformer's mimetype is in array format.
                let transformer_mimetypes = transformer.mimetype;
                if (!this._isArray(transformer_mimetypes)) {
                    transformer_mimetypes = [transformer_mimetypes];
                }
                
                for (let transformer_mimetype of transformer_mimetypes) {
                    if (transformer_mimetype in bundle) {
                        richTransformer = transformer;
                        break;
                    }
                }
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
                return Promise.resolve({
                    mimetype: mimetype, 
                    el: transformer.call(transformer, data, mimetype, document)
                });
            } catch (e) {
                return Promise.reject(e);
            }
        }

        return Promise.reject(new Error('Transformer for mimetype ' + mimetype + ' not found.'));
    }
    
    /**
     * Deletes all transformers by mimetype.
     * @param {string|string[]} mimetype - mimetype the data type (e.g. text/plain, text/html, image/png)
     */
    del(mimetype) {
        
        // Convert mimetype to an array.
        let mimetypes = mimetype;
        if (!this._isArray(mimetypes)) {
            mimetypes = [mimetypes];
        }
        
        // Remove each mimetype.
        for (mimetype of mimetypes) {
            for (let i = 0; i < this.transformers.length; i++) {
                var transformer = this.transformers[i];
                
                // If the mimetype matches the one we want to remove, remove it.
                if (mimetype === transformer.mimetype) {
                    this.transformers.splice(i, 1);
                    i--;
                
                // If the mimetype we want to remove is in the list of the
                // mimetypes supported by the transformer, remove it from the list.
                // If the transformer mimetype list is then empty, remove the
                // transformer.
                } else if (this._isArray(transformer.mimetype) && mimetype in transformer.mimetype) {
                    if (transformer.mimetype.length == 1) {
                        this.transformers.splice(i, 1);
                        i--;
                    } else {
                        transformer.mimetype.splice(transformer.mimetype.indexOf(mimetype), 1);
                    }
                }
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
            
            // Get an array of the mimetypes that the transformer supports.
            let transformer_mimetypes = transformer.mimetype;
            if (!this._isArray(transformer_mimetypes)) {
                transformer_mimetypes = [transformer_mimetypes];
            }
            
            // Check if any of the mimetypes match the one we are looking for.
            for (let transformer_mimetype of transformer_mimetypes) {
                if (mimetype === transformer_mimetype) {
                    return transformer;
                }
            }
        }
    }

    /**
     * Sets a transformer matching the mimetype
     * @param {string|string[]} mimetype - the data type (e.g. text/plain, text/html, image/png)
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
     * @param  {string|string[]} mimetype
     * @return {function} inserted transformer function (may be different than arg)
     */
    push(transformer, mimetype) {
        // If the mimetype specified is different than the mimetype of the
        // transformer, make a copy of the transformer and set the new mimetype
        // on the copy.
        let transform = transformer;
        if (mimetype && transformer.mimetype !== mimetype) {
            transform = this._proxy(transformer, mimetype);
        }
        
        // Verify a mimetype is set on the transformer.
        if (!transform.mimetype) throw Error('Could not infer transformer mimetype');
        
        this.transformers.push(transform);
        return transform;
    }
    
    /**
     * Create a proxy to a transformer, using another mimetype.
     * @param  {function} transformer
     * @param  {string|string[]} mimetype
     * @return {function} transformer
     */
    _proxy(transformer, mimetype) {
        let transform = function(...args) { return transformer.call(this, ...args); };
        transform.mimetype = mimetype;
        return transform;
    }
    
    /**
     * Check if value is an array.
     * @param  {Object}  x
     * @return {Boolean}
     */
    _isArray(x) {
        return Array.isArray(x) ||
            (typeof x === 'object' && Object.prototype.toString.call(x) === '[object Array]');
    }
}

export default {Transformime, TextTransformer, ImageTransformer, HTMLTransformer};
