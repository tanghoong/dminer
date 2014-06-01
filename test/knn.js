'use strict';

var assert = require('assert'),
  distance = require('../lib/distance'),
  Knn = require('../lib/knn');

describe('knn', function () {

  describe('array', function () {

    var knn;
    beforeEach(function () {
      knn = new Knn();
      knn.addDocument(0, [11, 12, 13])
         .addDocument(0, [11, 12, 14])
         .addDocument(0, [11, 14, 15])
         .addDocument(1, [21, 22, 23])
         .addDocument(1, [21, 22, 24])
         .addDocument(1, [21, 24, 25])
         .addDocument(2, [31, 32, 33])
         .addDocument(2, [31, 32, 34])
         .addDocument(2, [31, 34, 35]);
    });

    it('should find 0 clusters', function () {
      assert.deepEqual([], knn.classify([41, 42, 43], 5));
    });

    it('should find 1 cluster', function () {
      assert.deepEqual([0], knn.classify([11, 12, 16], 5));
    });

    it('should find 2 clusters', function () {
      assert.deepEqual([0, 1], knn.classify([12, 22, 36], 5));
    });

    it('should find 3 clusters', function () {
      assert.deepEqual([0, 1, 2], knn.classify([11, 21, 31], 9));
    });
  });

  describe('point2d', function () {

    var knn;
    beforeEach(function () {
      knn = new Knn();
      knn.addDocument(0, [0, 0])
         .addDocument(0, [10, 0])
         .addDocument(0, [0, 10])
         .addDocument(1, [100, 100])
         .addDocument(1, [110, 100])
         .addDocument(1, [100, 110])
         .addDocument(2, [200, 200])
         .addDocument(2, [210, 200])
         .addDocument(2, [200, 210]);
    });

    it('should find 1 cluster', function () {
      assert.deepEqual([0], knn.classify([10, 10], 3, distance.point2d));
    });

    it('should find 2 clusters', function () {
      assert.deepEqual([0, 1], knn.classify([55, 55], 3, distance.point2d));
    });

    it('should find 3 clusters', function () {
      assert.deepEqual([1, 0, 2], knn.classify([100, 100], 9, distance.point2d));
    });
  });

  describe('point3d', function () {

    var knn;
    beforeEach(function () {
      knn = new Knn();
      knn.addDocument(0, [0, 0, 0])
         .addDocument(0, [10, 0, 0])
         .addDocument(0, [0, 10, 0])
         .addDocument(0, [0, 0, 10])
         .addDocument(1, [100, 100, 100])
         .addDocument(1, [110, 100, 100])
         .addDocument(1, [100, 110, 100])
         .addDocument(1, [100, 100, 110])
         .addDocument(2, [200, 200, 200])
         .addDocument(2, [210, 200, 200])
         .addDocument(2, [200, 210, 200])
         .addDocument(2, [200, 200, 210]);
    });

    it('should find 1 cluster', function () {
      assert.deepEqual([0], knn.classify([10, 10, 10], 4, distance.point3d));
    });

    it('should find 2 clusters', function () {
      assert.deepEqual([0, 1], knn.classify([55, 55, 55], 5, distance.point3d));
    });

    it('should find 3 clusters', function () {
      assert.deepEqual([1, 0, 2], knn.classify([100, 100, 100], 12, distance.point3d));
    });
  });
});
