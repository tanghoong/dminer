/*global describe, it */
/*jslint node: true */

var assert, distance;

// I need a Mocha!
assert = require('assert');

// get distance metric functions 
distance = require('../lib/distance.js');

// test distance metric functions
describe('distance.array', function () {
    'use strict';

    it('should return 0', function () {
        assert.equal(0, distance.array([1, 2], [1, 2]));
    });

    it('should return 1', function () {
        assert.equal(1, distance.array([1, 2], [1, 2, 3]));
    });

    it('should return 2', function () {
        assert.equal(2, distance.array([1, 2, 3], [1, 2, 4]));
    });

    it('should return false (empty intersect)', function () {
        assert.equal(false, distance.array([1, 2], [3, 4]));
    });

    it('should return false (equal references)', function () {
        var input = [1, 2];
        assert.equal(false, distance.array(input, input));
    });
});
