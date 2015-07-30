import {assert} from 'chai';

import {jsdom} from 'jsdom';

import {TextTransformer} from '../src/transformime';

describe('text transformer', function() {
    beforeEach(function() {
        this.document = jsdom();
    });

    it('should have the text/plain mimetype', function() {
        assert.equal(TextTransformer.mimetype, "text/plain");
    });
    describe('#transform', function() {
        it('should create a pre with all the passed in elements', function() {
            var text = "There is no text but text.\nWoo.";
            var el = TextTransformer(text, this.document);
            assert.equal(el.innerHTML, text);
            assert.equal(el.textContent, text);
            assert.equal(el.localName, "pre");
        });
    });
});
