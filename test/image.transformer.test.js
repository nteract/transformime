import {assert} from 'chai';

import {jsdom} from 'jsdom';

import {Transformime} from '../src/transformime';
import {ImageTransformer} from '../src/transformime';

describe('image transformer', function() {
    beforeEach(function() {
        this.document = jsdom();
        this.t = new Transformime();
        t.transformers = [];
        t.push(ImageTransformer);
    });

    it('supports multiple mimetypes', function() {
        assert.isArray(ImageTransformer.mimetype);
    });
    describe('#transform', function() {
        it('should create an <img> with the right mimetype', function() {
            var imageData = "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
            var el = t.transform(imageData, 'image/png', this.document);

            assert.equal(el.src, "data:image/png;base64," + imageData);
            assert.equal(el.localName, "img");
            assert.equal(el.innerHTML, "");

            imageData = "R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=";
            var el2 = t.transform(imageData, 'image/gif', this.document);
            assert.equal(el2.src, "data:image/gif;base64," + imageData);
            assert.equal(el2.localName, "img");
            assert.equal(el2.innerHTML, "");
        });
    });
});
