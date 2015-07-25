import {assert} from 'chai';

import {jsdom} from 'jsdom';

import {TransformerBase} from '../src/transformime';

describe('transformer base', function() {
    beforeEach(function() {
        this.document = jsdom();
    });

    describe('#mimetype', function() {
        it('should throw "mimetype not implemented"', function() {
            var t = new TransformerBase();
            // "calling" the getter with mocha doesn't catch the error properly
            // wrapping with a function fixes it
            assert.throw(() => t.mimetype, 'mimetype not implemented');
        });
    });

    describe('#transform', function() {
        it('should throw "transform not implemented"', function() {
            var t = new TransformerBase();
            assert.throw(t.transform, 'transform not implemented');
        });
    });
});
