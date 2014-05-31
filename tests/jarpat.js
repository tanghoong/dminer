'use strict';

var assert = require('assert'),
  dminer = require('..'),
  distance = dminer.distance,
  jarpat = dminer.jarpat;

describe('jarpat', function () {

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

  it('should support custom distance metric functions', function () {
    var dataset, expected, clusters;
    dataset = [
      [0, 10], [0, 0], [10, 0],
      [90, 0], [100, 0], [100, 10],
      [100, 90], [100, 100], [90, 100],
      [10, 100], [0, 100], [0, 90]
    ];
    expected = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]];
    clusters = jarpat.clusters(dataset, 2, 1, distance.point2d);
    assert.deepEqual(expected, clusters);
  });
});
