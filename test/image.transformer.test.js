import {assert} from 'chai';

import {jsdom} from 'jsdom';

import {ImageTransformer} from '../src/transformime';

describe('image transformer', function() {
    beforeEach(function() {
        this.document = jsdom();
    });

    it('should accept a mimetype', function() {
        var imt = new ImageTransformer('image/png');
        assert.equal(imt.mimetype, "image/png");
        var imt2 = new ImageTransformer('image/jpeg');
        assert.equal(imt2.mimetype, "image/jpeg");
    });
    describe('#transform', function() {
        it('should create an <img> with the right mimetype', function() {
            var imt = new ImageTransformer('image/png');
            var imageData = "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
            var el = imt.transform(imageData, this.document);

            assert.equal(el.src, "data:image/png;base64," + imageData);
            assert.equal(el.localName, "img");
            assert.equal(el.innerHTML, "");

            var imt2 = new ImageTransformer('image/gif');
            imageData = "R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=";
            var el2 = imt2.transform(imageData, this.document);
            assert.equal(el2.src, "data:image/gif;base64," + imageData);
            assert.equal(el2.localName, "img");
            assert.equal(el2.innerHTML, "");
        });
    });
});
