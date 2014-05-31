'use strict';

var assert = require('assert'),
  dminer = require('..'),
  distance = dminer.distance,
  jarpat = dminer.jarpat;

describe('jarpat', function () {

  describe('array', function () {

    it('should return the expected clusters', function () {
      var dataset, expected, clusters;
      dataset = [
        [111, 112, 113], [111, 112, 114], [111, 115, 113],
        [221, 222, 223], [221, 222, 224], [221, 225, 223],
        [331, 332, 333], [331, 332, 334], [331, 335, 333],
        [441, 442, 443]
      ];
      expected = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]];
      clusters = jarpat.clusters(dataset, 2, 1);
      assert.deepEqual(expected, clusters);
    });
  });

  describe('point2d', function () {

    it('should return the expected clusters', function () {
      var dataset, expected, clusters;
      // 9 points, represents 3 2d triangles
      dataset = [
        [0, 0],     [10, 0],    [0, 10],
        [100, 100], [110, 100], [100, 110],
        [200, 200], [210, 200], [200, 210]
      ];
      expected = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
      clusters = jarpat.clusters(dataset, 2, 1, distance.point2d);
      assert.deepEqual(expected, clusters);
    });
  });

  describe('point3d', function () {

    it('should return the expected clusters', function () {
      var dataset, expected, clusters;
      // 12 points, represents 3 3d tetrahedron
      dataset = [
        [0, 0, 0],       [10, 0, 0],      [0, 10, 0],      [0, 0, 10],
        [100, 100, 100], [110, 100, 100], [100, 110, 100], [100, 100, 110],
        [200, 200, 200], [210, 200, 200], [200, 210, 200], [200, 200, 210]
      ];
      expected = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]];
      clusters = jarpat.clusters(dataset, 2, 1, distance.point3d);
      assert.deepEqual(expected, clusters);
    });
  });
});
