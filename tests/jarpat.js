/*global describe, it */
/*jslint node: true */

var assert, jarpat, dataset, expected, clusters;

// I need a Mocha!
assert = require('assert');

// get Jarvis-Patrick clusterig
jarpat = require('../lib/jarpat.js');

// get dataset
dataset = [
    [111, 112, 113], [111, 112, 114], [111, 115, 113],
    [221, 222, 223], [221, 222, 224], [221, 225, 223],
    [331, 332, 333], [331, 332, 334], [331, 335, 333],
    [441, 442, 443]
];

// get expected clusters
expected = [
    [[111, 112, 113], [111, 112, 114], [111, 115, 113]],
    [[221, 222, 223], [221, 222, 224], [221, 225, 223]],
    [[331, 332, 333], [331, 332, 334], [331, 335, 333]],
    [[441, 442, 443]]
];

// test Jarvis-Patrick clustering
describe('jarpat', function () {
    'use strict';

    it('should return the expected clusters', function () {
        clusters = jarpat.clusters(dataset, 2, 1);
        assert.deepEqual(expected, clusters);
    });
});
