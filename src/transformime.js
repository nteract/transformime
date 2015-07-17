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
     * @param  {RendererBase[]} renderers       list of renderers, in reverse
     *                                          priority order
     * @param  {RendererBase} fallbackRenderer  renderer to default to when a
     *                                          mimetype is unsupported
     */
    constructor(renderers, fallbackRenderer) {

        // Initialize instance variables.
        this.renderers = renderers || [
            new TextRenderer(),
            new ImageRenderer('image/png'),
            new ImageRenderer('image/jpeg'),
            new HTMLRenderer()
        ];
        this.fallbackRenderer = fallbackRenderer || new DefaultRenderer();
    }

    /**
     * Transforms a mime bundle, using the richest available representation,
     * into an HTMLElement.
     * @param  {any}      bundle {mimetype1: data1, mimetype2: data2, ...}
     * @param  {Document} doc    Any of window.document, iframe.contentDocument
     * @return {Promise<HTMLElement>}
     */
    transformRichest(bundle, doc) {
        let element;
        let richRenderer = this.fallbackRenderer;

        // Choose the last renderer as the most rich
        for (let renderer of this.renderers) {
            if (renderer.mimetype in bundle) {
                richRenderer = renderer;
            }
        }

        if (richRenderer){
            let data = bundle[richRenderer.mimetype];
            return this.transform(data, richRenderer.mimetype, doc);
        }

        return Promise.reject(new Error('Renderer(s) for ' + Object.keys(bundle).join(', ') + ' not found.'));
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
     * Transforms a specific mime type into an HTMLElement.
     * @param  {any}    data     Raw data
     * @param  {string} mimetype MIME type (e.g. text/html, image/png)
     * @return {Promise<HTMLElement>}
     */
    transform(data, mimetype, doc) {
        let renderer = this.getRenderer(mimetype);
        if (renderer) {
            // Don't assume the transformation will return a promise.  Also
            // don't assume the transformation will succeed.
            try {
                return Promise.resolve(renderer.transform(data, doc || document));
            } catch (e) {
                return Promise.reject(e);
            }
        }

        return Promise.reject(new Error('Renderer for mimetype ' + mimetype + ' not found.'));
    }

    /**
     * Gets a renderer matching the mimetype
     * @param  string mimetype the data type (e.g. text/plain, text/html, image/png)
     * @return {RendererBase} Matching renderer
     */
    getRenderer(mimetype) {
        for (let renderer of this.renderers) {
            if (mimetype === renderer.mimetype) {
                return renderer;
            }
        }
        return null;
    }
}
