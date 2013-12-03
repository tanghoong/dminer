/*global describe, it */
/*jslint node: true */

var assert, mapper, dataset, matches;

// I need a Mocha!
assert = require('assert');

// get mapper
mapper = require('../lib/mapper.js');

// get dataset
dataset = [
    [111, 112, 113], [111, 112, 114], [111, 115, 113],
    [221, 222, 223], [221, 222, 224], [221, 225, 223],
    [331, 332, 333], [331, 332, 334], [331, 335, 333],
    [441, 442, 443]
];

// test knn classifier
describe('knn', function () {
    'use strict';

    it('should find 0 matches', function () {
        matches = mapper.map(dataset, [551, 552, 553]);
        assert.equal(0, matches.length);
    });

    it('should find 1 match', function () {
        matches = mapper.map(dataset, [111, 113]);
        assert.deepEqual(matches, [[111, 112, 113]]);
    });

    it('should find 2 matches', function () {
        matches = mapper.map(dataset, [111, 112]);
        assert.deepEqual(matches, [[111, 112, 113], [111, 112, 114]]);
    });
});
