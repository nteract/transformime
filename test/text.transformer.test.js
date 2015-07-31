import {assert} from 'chai';

import {jsdom} from 'jsdom';

import {Transformime} from '../src/transformime';
import {TextTransformer} from '../src/transformime';

describe('text transformer', function() {
    beforeEach(function() {
        this.document = jsdom();
        this.t = new Transformime();
        this.t.transformers = [];
        this.t.push(TextTransformer);
    });

    it('should have the text/plain mimetype', function() {
        assert.equal(TextTransformer.mimetype, "text/plain");
    });
    describe('#transform', function() {
        it('should create a pre with all the passed in elements', function() {
            var text = "There is no text but text.\nWoo.";
            var transformed = this.t.transform(text, TextTransformer.mimetype, this.document);
            return transformed.then(results => {
                assert.equal(results.el.innerHTML, text);
                assert.equal(results.el.textContent, text);
                assert.equal(results.el.localName, "pre");    
            });
        });
    });
});
