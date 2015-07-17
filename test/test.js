import {assert, expect} from 'chai';

var jsdom = require('jsdom');

import {Transformime} from '../src/transformime';
import {DefaultRenderer} from '../src/defaultrenderer';

import {RendererBase} from '../src/rendererbase';

/**
 * Dummy Renderer for spying on
 */
class DummyRenderer extends RendererBase {
    constructor(mimetype) {
        super();
        this._mimetype = mimetype;
    }

    get mimetype() {
        return this._mimetype;
    }

    set mimetype(mimetype) {
       this._mimetype = mimetype;
    }

    transform(data, doc) {
        let pre = doc.createElement('pre');
        pre.textContent = data;

        this.lastData = data;
        this.lastDoc = doc;
        return pre;
    }
}


describe('Transformime defaults', function() {
    before(function() {
        this.document = jsdom.jsdom();
    });
    describe('default constructor', function() {
        before(function(){
            this.t = new Transformime();
        });
        it('should have default renderers', function() {
            assert(Array.isArray(this.t.renderers));
        });
        it('should have the DefaultRenderer as the fallbackRenderer', function() {
            assert(this.t.fallbackRenderer instanceof DefaultRenderer);
        });
    });
});

describe('Transformime', function() {
    before(function() {
        this.dummyRenderer = new DummyRenderer("transformime/dummy");
        this.renderers = [this.dummyRenderer];
        this.t = new Transformime(this.renderers);
        this.document = jsdom.jsdom();
    });
    describe('transform', function() {
        it('should have called our DummyRender', function() {
            var el = this.t.transform("dummy-data", "transformime/dummy", this.document);

            assert.equal(this.dummyRenderer.lastData, "dummy-data");
            assert.equal(this.dummyRenderer.lastDoc, this.document);

            // el should be an HTMLElement, which only exists in jsdom or on a
            // real document.
            assert(el instanceof this.document.defaultView.HTMLElement);
        });
        it('should fail when the mimetype is not known', function() {
            expect(() => this.t.transform("my-data", "transformime/unknown", this.doc))
                .to.throw('Renderer for mimetype transformime/unknown not found.');
        });
    });
    describe('getRenderer', function() {
        it('should get the right renderer for a given mimetype', function() {
            let renderer = this.t.getRenderer('transformime/dummy');
            assert.equal(this.dummyRenderer, renderer);
        });
        it('should return null with an unknown mimetype', function() {
            assert.isNull(this.t.getRenderer('cats/calico'), 'found a renderer when I shouldn\'t have');
        });
    });
});
