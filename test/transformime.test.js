import {assert} from 'chai';

import {jsdom} from 'jsdom';

import {Transformime} from '../src/transformime';

/**
 * Dummy Transformer for spying on
 */
function DummyTransformer(data, doc) {
    let pre = doc.createElement('pre');
    DummyTransformer.lastData = data;
    DummyTransformer.lastDoc = doc;
    pre.textContent = data;
    return pre;
}

describe('Transformime defaults', function() {
    before(function() {
        this.document = jsdom();
    });
    describe('default constructor', function() {
        before(function(){
            this.t = new Transformime();
        });
        it('should have default transformers', function() {
            assert(Array.isArray(this.t.transformers));
        });
    });
});

describe('Transformime', function() {
    beforeEach(function() {
        this.t = new Transformime();
        this.dummyTransformer1 = this.t.push(DummyTransformer, "transformime/dummy1");
        this.dummyTransformer2 = this.t.push(DummyTransformer, "transformime/dummy2");
        this.dummyTransformer3 = this.t.push(DummyTransformer, "transformime/dummy3");
        this.document = jsdom();
    });
    describe('#transform', function() {
        it('should have called our DummyRender', function() {
            var elPromise = this.t.transform("dummy-data", "transformime/dummy1", this.document);

            return elPromise.then((results) => {
                assert.equal(DummyTransformer.lastData, "dummy-data");
                assert.equal(DummyTransformer.lastDoc, this.document);

                // el should be an HTMLElement, which only exists in jsdom or on a
                // real document.
                assert(results.el instanceof this.document.defaultView.HTMLElement);
            });

        });
        it('should fail when the mimetype is not known', function() {
            let elPromise = this.t.transform("my-data", "transformime/unknown", this.doc);

            return elPromise.catch((err) => {
                assert.equal(err.message, 'Transformer for mimetype transformime/unknown not found.');
            });
        });
    });
    describe('#get', function() {
        it('should get the right transformer for a given mimetype', function() {
            let transformer = this.t.get('transformime/dummy1');
            assert.equal(this.dummyTransformer1, transformer);
        });
        it('should return undefined with an unknown mimetype', function() {
            assert.isUndefined(this.t.get('cats/calico'), 'found a transformer when I shouldn\'t have');
        });
    });
    describe('#transformRichest', function() {
        describe('should only render the "richest" of the transformers', function() {
            it('when called with all mimetypes in the mimebundle, only return lastmost', function() {
                let mimeBundle = {
                    'transformime/dummy1': 'dummy data 1',
                    'transformime/dummy2': 'dummy data 2',
                    'transformime/dummy3': 'dummy data 3'
                };

                var elPromise = this.t.transformRichest(mimeBundle, this.document);
                return elPromise.then( (results) => {
                    assert.equal(DummyTransformer.lastData, "dummy data 3");
                    
                    assert.equal(results.mimetype, "transformime/dummy3");
                    assert.equal(results.el.textContent, "dummy data 3");
                });

            });
            it('when called with a lesser mimebundle, choose most rich', function() {
                let mimeBundle = {
                    'transformime/dummy1': 'dummy data 1',
                    'transformime/dummy2': 'dummy data 2'
                };

                let elPromise = this.t.transformRichest(mimeBundle, this.document);
                return elPromise.then( () => {
                    assert.equal(DummyTransformer.lastData, "dummy data 2");
                });
            });
            it('when called with mimetypes it doesn\'t know, it uses supported mimetypes', function() {
                let mimeBundle = {
                    'video/quicktime': 'cat vid',
                    'transformime/dummy1': 'dummy data 1',
                    'application/x-shockwave-flash': 'flashy',
                    'application/msword': 'DOC',
                    'application/zip': 'zippy'
                };

                let elPromise = this.t.transformRichest(mimeBundle, this.document);
                return elPromise.then( () => {
                    assert.equal(DummyTransformer.lastData, "dummy data 1");
                });
            });
        });
    });
});
