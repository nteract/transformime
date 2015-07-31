import {assert} from 'chai';

import {jsdom} from 'jsdom';

import {Transformime} from '../src/transformime';
import {HTMLTransformer} from '../src/transformime';

describe('html transformer', function() {
    beforeEach(function() {
        this.document = jsdom();
        this.t = new Transformime();
        this.t.transformers = [];
        this.t.push(HTMLTransformer);
    });

    it('should have the text/html mimetype', function() {
        assert.equal(HTMLTransformer.mimetype, "text/html");
    });
    describe('#transform', function() {
        it('should create a div with all the passed in elements', function() {
            var htmlText = "<h1>This is great</h1>";
            return this.t.transform(HTMLTransformer.mimetype, htmlText, this.document).then(results => {
                assert.equal(results.el.innerHTML, htmlText);
                assert.equal(results.el.localName, "div");
            });
        });
    });
});
