"use strict";

import {TextRenderer} from './textrenderer';
import {DefaultRenderer} from './defaultrenderer';
import {HTMLRenderer} from './htmlrenderer';

/**
 * Transforms mimetypes into HTMLElements
 */
export class Transformime {

    /**
     * Public constructor
     */
    constructor() {

        // Initialize instance variables.
        this.renderers = [
            new TextRenderer(),
            new HTMLRenderer()
        ];
        this.fallbackRenderer = new DefaultRenderer();
    }

    /**
     * Transforms a mime bundle, using the richest available representation, 
     * into an HTMLElement.
     * @param  {object} bundle - mime bundle
     * @return {HTMLElement}
     */
    transformRichest(bundle) {
        this._validateMimebundle(bundle);

        let element;
        let richRenderer = this.fallbackRenderer;

        // Choose the last renderer as the most rich
        for (let renderer of this.renderers) {
            if (bundle.data && renderer.mimetype in bundle.data) {
                richRenderer = renderer;
            }
        }

        if (bundle.data){
            let data = bundle.data[richRenderer.mimetype];
            element = richRenderer.transform(data, metadata);
            return element;
        }

        throw new Error('Renderer for ' + Object.keys(json).join(', ') + ' not found.');
    }

    /**
     * Transforms all of the mime types in a mime bundle into HTMLElements.
     * @param  {object} bundle - mime bundle
     * @return {HTMLElement[]}
     */
    transformAll(bundle) {
        this._validateMimebundle(bundle);
        return bundle.map(function(mimetype) { return this.transformMimetype(bundle[mimetype]); });
    }

    /**
     * Transorms a specific mime type into an HTMLElement.
     * @param  {object} data
     * @param  {string} mimetype
     * @return {HTMLElement}
     */
    transform(data, mimetype) {
        let renderer = this.get_renderer(mimetype);
        if (renderer) {
            return renderer.transform(data, metadata);
        }

        throw new Error('Renderer for mimetype ' + mimetype + ' not found.');
    }

    /**
     * Validate a mime bundle.
     * @param  {object} bundle
     * @return {object} bundle
     */
    _validateMimebundle(bundle) {
        if (typeof bundle.data !== 'object') {
            console.warn('Mimebundle missing data', bundle);
            bundle.data = {};
        }

        if (typeof bundle.metadata !== 'object') {
            console.warn('Mimebundle missing metadata', bundle);
            bundle.metadata = {};
        }

        return bundle;
    }
}
