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
      assert.deepEqual([], knn.classify([41, 42, 43], 3));
    });

    it('should find 1 cluster', function () {
      assert.deepEqual([0], knn.classify([11, 12, 16], 3));
    });

    it('should find 2 clusters', function () {
      assert.deepEqual([0, 1], knn.classify([12, 22, 36], 3));
    });

    it('should find 3 clusters', function () {
      assert.deepEqual([0, 1, 2], knn.classify([11, 21, 31], 3));
    });
  });

  describe('point2d', function () {

    var knn;
    beforeEach(function () {
      knn = new Knn();
      knn.addDocument(0, [0, 0])
         .addDocument(0, [10, 10])
         .addDocument(0, [20, 20])
         .addDocument(1, [100, 100])
         .addDocument(1, [110, 110])
         .addDocument(1, [120, 120])
         .addDocument(2, [200, 200])
         .addDocument(2, [210, 210])
         .addDocument(2, [220, 220]);
    });

    it('should find 1 cluster', function () {
      assert.deepEqual([0], knn.classify([30, 30], 3, distance.point2d));
    });

    it('should find 2 clusters', function () {
      assert.deepEqual([0, 1], knn.classify([60, 60], 3, distance.point2d));
    });

    it('should find 3 clusters', function () {
      assert.deepEqual([1, 0, 2], knn.classify([110, 110], 9, distance.point2d));
    });
  });

  describe('point3d', function () {

    var knn;
    beforeEach(function () {
      knn = new Knn();
      knn.addDocument(0, [0, 0, 0])
         .addDocument(0, [10, 10, 10])
         .addDocument(0, [20, 20, 20])
         .addDocument(0, [30, 30, 30])
         .addDocument(1, [100, 100, 100])
         .addDocument(1, [110, 110, 110])
         .addDocument(1, [120, 120, 120])
         .addDocument(1, [130, 130, 130])
         .addDocument(2, [200, 200, 200])
         .addDocument(2, [210, 210, 210])
         .addDocument(2, [220, 220, 220])
         .addDocument(2, [230, 230, 230]);
    });

    it('should find 1 cluster', function () {
      assert.deepEqual([0], knn.classify([40, 40, 40], 4, distance.point3d));
    });

    it('should find 2 clusters', function () {
      assert.deepEqual([0, 1], knn.classify([65, 65, 65], 4, distance.point3d));
    });

    it('should find 3 clusters', function () {
      assert.deepEqual([1, 0, 2], knn.classify([110, 110, 110], 12, distance.point3d));
    });
  });
});
