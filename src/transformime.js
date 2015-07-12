"use strict";

import {TextRenderer} from './textrenderer';
import {DefaultRenderer} from './defaultrenderer';
import {ImageRenderer} from './imagerenderer';
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
            new ImageRenderer('image/png'),
            new ImageRenderer('image/jpeg'),
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
    transformRichest(bundle, doc) {
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
            return this.transform(data, richRenderer.mimetype, doc);
        }

        throw new Error('Renderer for ' + Object.keys(json).join(', ') + ' not found.');
    }

    /**
     * Transforms all of the mime types in a mime bundle into HTMLElements.
     * @param  {object} bundle - mime bundle
     * @return {HTMLElement[]}
     */
    transformAll(bundle, doc) {
        return bundle.map(function(mimetype) { return this.transformMimetype(bundle[mimetype], mimetype, doc); });
    }

    /**
     * Transorms a specific mime type into an HTMLElement.
     * @param  {object} data
     * @param  {string} mimetype
     * @return {HTMLElement}
     */
    transform(data, mimetype, doc) {
        let renderer = this.get_renderer(mimetype);
        if (renderer) {
            return renderer.transform(data, doc || document);
        }

        throw new Error('Renderer for mimetype ' + mimetype + ' not found.');
    }
}
