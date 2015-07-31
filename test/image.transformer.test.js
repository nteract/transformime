import {assert} from 'chai';

import {jsdom} from 'jsdom';

import {Transformime} from '../src/transformime';
import {ImageTransformer} from '../src/transformime';

describe('image transformer', function() {
    beforeEach(function() {
        this.document = jsdom();
        this.t = new Transformime();
        this.t.transformers = [];
        this.t.push(ImageTransformer);
    });

    it('supports multiple mimetypes', function() {
        assert.isArray(ImageTransformer.mimetype);
    });
    describe('#transform', function() {
        it('should create an <img> with the right mimetype', function() {
            let imageData = "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
            let p1 = this.t.transform('image/png', imageData, this.document).then(results => {
                assert.equal(results.el.src, "data:image/png;base64," + imageData);
                assert.equal(results.el.localName, "img");
                assert.equal(results.el.innerHTML, "");
            });
            
            

            let imageData2 = "R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=";
            let p2 = this.t.transform('image/gif', imageData, this.document).then(results => {
                assert.equal(results.el.src, "data:image/gif;base64," + imageData);
                assert.equal(results.el.localName, "img");
                assert.equal(results.el.innerHTML, "");
            });
            
            return Promise.all([p1, p2]);
        });
    });
});
