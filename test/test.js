var assert = require("assert");

import {Transformime} from '../src/transformime';

describe('Transformime', function() {
    describe('constructor', function() {
        it('should have renderers and fallbackRenderer set', function() {
            let t = new Transformime();

            assert(Array.isArray(t.renderers));
        });
    });
});
