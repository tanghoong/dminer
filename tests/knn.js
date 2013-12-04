/*global describe, it */
/*jslint node: true */

var assert, knn, labels;

// I need a Mocha!
assert = require('assert');

// get KNN classifier
knn = require('../lib/knn.js');

// training process
knn.addDocument(1,  [11, 12, 13])
    .addDocument(1, [11, 12, 14])
    .addDocument(1, [11, 14, 15])
    .addDocument(2, [21, 22, 23])
    .addDocument(2, [21, 22, 24])
    .addDocument(2, [21, 24, 25])
    .addDocument(3, [31, 32, 33])
    .addDocument(3, [31, 32, 34])
    .addDocument(3, [31, 34, 35]);

// test knn classifier
describe('knn', function () {
    'use strict';

    it('should find 0 matches', function () {
        labels = knn.classify([41, 42, 43], 5);
        assert.equal(0, labels.length);
    });

    it('should find 1 match', function () {
        labels = knn.classify([11, 12, 16], 5);
        assert.deepEqual(labels, [1]);
    });

    it('should find 2 matches', function () {
        labels = knn.classify([12, 22, 36], 5);
        assert.deepEqual(labels, [1, 2]);
    });

    it('should find 3 matches', function () {
        labels = knn.classify([11, 21, 31], 9);
        assert.deepEqual(labels, [1, 2, 3]);
    });
});
