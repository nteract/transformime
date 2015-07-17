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
    beforeEach(function() {
        this.dummyRenderer1 = new DummyRenderer("transformime/dummy1");
        this.dummyRenderer2 = new DummyRenderer("transformime/dummy2");
        this.dummyRenderer3 = new DummyRenderer("transformime/dummy3");
        this.renderers = [
            this.dummyRenderer1,
            this.dummyRenderer2,
            this.dummyRenderer3
        ];
        this.t = new Transformime(this.renderers);
        this.document = jsdom.jsdom();
    });
    describe('transform', function() {
        it('should have called our DummyRender', function() {
            var el = this.t.transform("dummy-data", "transformime/dummy1", this.document);

            assert.equal(this.dummyRenderer1.lastData, "dummy-data");
            assert.equal(this.dummyRenderer1.lastDoc, this.document);

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
            let renderer = this.t.getRenderer('transformime/dummy1');
            assert.equal(this.dummyRenderer1, renderer);
        });
        it('should return null with an unknown mimetype', function() {
            assert.isNull(this.t.getRenderer('cats/calico'), 'found a renderer when I shouldn\'t have');
        });
    });
    describe('transformRichest', function() {
        describe('should only render the "richest" of the renderers', function() {
            it('when called with a all mimetypes in the mimebundle, only return lastmost', function() {
                let mimeBundle = {
                    'transformime/dummy1': 'dummy data 1',
                    'transformime/dummy2': 'dummy data 2',
                    'transformime/dummy3': 'dummy data 3'
                };

                let el = this.t.transformRichest(mimeBundle, this.document);
                assert.isUndefined(this.dummyRenderer1.lastData);
                assert.isUndefined(this.dummyRenderer2.lastData);
                assert(this.dummyRenderer3.lastData, "dummy data 3");
            });
            it('when called with a lesser mimebundle, choose most rich', function() {
                let mimeBundle = {
                    'transformime/dummy1': 'dummy data 1',
                    'transformime/dummy2': 'dummy data 2'
                };

                let el = this.t.transformRichest(mimeBundle, this.document);
                assert.isUndefined(this.dummyRenderer1.lastData);
                assert(this.dummyRenderer2.lastData, "dummy data 2");
                assert.isUndefined(this.dummyRenderer3.lastData);
            });
            it('when called with mimetypes it doesn\'t know, it uses supported mimetypes', function() {
                let mimeBundle = {
                    'video/quicktime': 'cat vid',
                    'transformime/dummy1': 'dummy data 1',
                    'application/x-shockwave-flash': 'flashy',
                    'application/msword': 'DOC',
                    'application/zip': 'zippy'
                };

                let el = this.t.transformRichest(mimeBundle, this.document);
                assert(this.dummyRenderer1.lastData, "dummy data 1");
                assert.isUndefined(this.dummyRenderer2.lastData);
                assert.isUndefined(this.dummyRenderer3.lastData);
            });
            it('when called with no supported mimetypes, it throws an error', function(){
                let mimeBundle = {
                    'video/quicktime': 'cat vid',
                    'application/zip': 'zippy'
                };

                expect(() => this.t.transformRichest(mimeBundle, this.document))
                    .to.throw('Renderer(s) for mimetype video/quicktime, application/zip not found.');
            });
        });
    });
});
