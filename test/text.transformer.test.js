import {assert} from 'chai';

import {jsdom} from 'jsdom';

import {TextTransformer} from '../src/transformime';

describe('text transformer', function() {
    beforeEach(function() {
        this.document = jsdom();
    });

    it('should have the text/plain mimetype', function() {
        var t = new TextTransformer();
        assert.equal(t.mimetype, "text/plain");
    });
    describe('#transform', function() {
        it('should create a pre with all the passed in elements', function() {
            var t = new TextTransformer();

            var text = "There is no text but text.\nWoo.";
            var el = t.transform(text, this.document);
            assert.equal(el.innerHTML, text);
            assert.equal(el.textContent, text);
            assert.equal(el.localName, "pre");
        });
    });
});
