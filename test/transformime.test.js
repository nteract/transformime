import {assert} from 'chai';

import {jsdom} from 'jsdom';

import {Transformime} from '../src/transformime';
import {DefaultTransformer} from '../src/transformime';

/**
 * Dummy Transformer for spying on
 */
class DummyTransformer{
    constructor(mimetype) {
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

        this.lastData = data;
        this.lastDoc = doc;
        pre.textContent = data;
        return pre;
    }
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
        this.dummyTransformer1 = new DummyTransformer("transformime/dummy1");
        this.dummyTransformer2 = new DummyTransformer("transformime/dummy2");
        this.dummyTransformer3 = new DummyTransformer("transformime/dummy3");
        this.transformers = [
            this.dummyTransformer1,
            this.dummyTransformer2,
            this.dummyTransformer3
        ];
        this.t = new Transformime(this.transformers);
        this.document = jsdom();
    });
    describe('#transform', function() {
        it('should have called our DummyRender', function() {
            var elPromise = this.t.transform("dummy-data", "transformime/dummy1", this.document);

            return elPromise.then((el) => {
                assert.equal(this.dummyTransformer1.lastData, "dummy-data");
                assert.equal(this.dummyTransformer1.lastDoc, this.document);

                // el should be an HTMLElement, which only exists in jsdom or on a
                // real document.
                assert(el instanceof this.document.defaultView.HTMLElement);
            });

        });
        it('should fail when the mimetype is not known', function() {
            let elPromise = this.t.transform("my-data", "transformime/unknown", this.doc);

            return elPromise.catch((err) => {
                assert.equal(err.message, 'Transformer for mimetype transformime/unknown not found.');
            });
        });
    });
    describe('#getTransformer', function() {
        it('should get the right transformer for a given mimetype', function() {
            let transformer = this.t.getTransformer('transformime/dummy1');
            assert.equal(this.dummyTransformer1, transformer);
        });
        it('should return undefined with an unknown mimetype', function() {
            assert.isUndefined(this.t.getTransformer('cats/calico'), 'found a transformer when I shouldn\'t have');
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
                return elPromise.then( (mimel) => {
                    assert.isUndefined(this.dummyTransformer1.lastData);
                    assert.isUndefined(this.dummyTransformer2.lastData);
                    assert.equal(this.dummyTransformer3.lastData, "dummy data 3");

                    assert.equal(mimel.mimetype, "transformime/dummy3");
                    assert.equal(mimel.el.textContent, "dummy data 3");
                });

            });
            it('when called with a lesser mimebundle, choose most rich', function() {
                let mimeBundle = {
                    'transformime/dummy1': 'dummy data 1',
                    'transformime/dummy2': 'dummy data 2'
                };

                let elPromise = this.t.transformRichest(mimeBundle, this.document);
                return elPromise.then( () => {
                    assert.isUndefined(this.dummyTransformer1.lastData);
                    assert.equal(this.dummyTransformer2.lastData, "dummy data 2");
                    assert.isUndefined(this.dummyTransformer3.lastData);
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
                    assert.equal(this.dummyTransformer1.lastData, "dummy data 1");
                    assert.isUndefined(this.dummyTransformer2.lastData);
                    assert.isUndefined(this.dummyTransformer3.lastData);
                });
            });
        });
    });
    describe("#transformAll", function() {
        it('should return all available representations with a mimebundle', function() {
            let mimeBundle = {
                'transformime/dummy1': 'dummy data 1',
                'transformime/dummy2': 'dummy data 2',
                'transformime/dummy3': 'dummy data 3'
            };

            var elPromise = this.t.transformAll(mimeBundle, this.document);
            return elPromise.then( (els) => {
                assert.equal(this.dummyTransformer1.lastData, "dummy data 1");
                assert.equal(this.dummyTransformer2.lastData, "dummy data 2");
                assert.equal(this.dummyTransformer3.lastData, "dummy data 3");

                els.map(mimel => {

                    switch (mimel.mimetype){
                        case "transformime/dummy1":
                            assert.equal("dummy data 1", mimel.el.textContent);
                            break;
                        case "transformime/dummy2":
                            assert.equal("dummy data 2", mimel.el.textContent);
                            break;
                        case "transformime/dummy3":
                            assert.equal("dummy data 3", mimel.el.textContent);
                            break;
                    }

                });

            });

        });
    });
});
