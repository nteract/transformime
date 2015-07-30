import {assert} from 'chai';

import {jsdom} from 'jsdom';

import {ImageTransformer} from '../src/transformime';

describe('image transformer', function() {
    beforeEach(function() {
        this.document = jsdom();
    });

    it('shouldn\'t have a mimetype', function() {
        assert.equal(ImageTransformer.mimetype, undefined);
    });
    describe('#transform', function() {
        it('should create an <img> with the right mimetype', function() {
            ImageTransformer.mimetype = 'image/png';
            var imageData = "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
            var el = ImageTransformer.call(ImageTransformer, imageData, this.document);

            assert.equal(el.src, "data:image/png;base64," + imageData);
            assert.equal(el.localName, "img");
            assert.equal(el.innerHTML, "");

            ImageTransformer.mimetype = 'image/gif';
            imageData = "R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=";
            var el2 = ImageTransformer.call(ImageTransformer, imageData, this.document);
            assert.equal(el2.src, "data:image/gif;base64," + imageData);
            assert.equal(el2.localName, "img");
            assert.equal(el2.innerHTML, "");
        });
    });
});
