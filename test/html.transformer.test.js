import {assert} from 'chai';

import {jsdom} from 'jsdom';

import {HTMLTransformer} from '../src/transformime';

describe('html transformer', function() {
    beforeEach(function() {
        this.document = jsdom();
    });

    it('should have the text/html mimetype', function() {
        assert.equal(HTMLTransformer.mimetype, "text/html");
    });
    describe('#transform', function() {
        it('should create a div with all the passed in elements', function() {
            var htmlText = "<h1>This is great</h1>";
            var el = HTMLTransformer(htmlText, this.document);
            assert.equal(el.innerHTML, htmlText);
            assert.equal(el.localName, "div");
        });
    });
});
