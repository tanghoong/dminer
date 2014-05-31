'use strict';

var assert = require('assert'),
  distance = require('../lib/distance');

describe('distance', function () {

  describe('array', function () {

    it('should return distance', function () {
      assert.strictEqual(0, distance.array([1, 2], [1, 2]));
      assert.strictEqual(1, distance.array([1, 2], [1, 2, 3]));
      assert.strictEqual(2, distance.array([1, 2, 3], [1, 2, 4]));
    });

    it('should return infinity (empty intersect)', function () {
      assert.strictEqual(Infinity, distance.array([1, 2], [3, 4]));
    });
  });

  describe('point2d', function () {

    it('should return distance', function () {
      var p1, p2, expected;
      p1 = [3, 3];
      p2 = [6, 6];
      expected = Math.sqrt(2 * 6 * 6) / 2;
      assert.strictEqual(0, distance.point2d(p1, p1));
      assert.strictEqual(expected, distance.point2d(p1, p2));
      assert.strictEqual(expected, distance.point2d(p2, p1));
    });
  });

  describe('point3d', function () {

    it('should return distance', function () {
      var p1, p2, expected;
      p1 = [3, 3, 3];
      p2 = [6, 6, 6];
      expected = Math.sqrt(3 * 6 * 6) / 2;
      assert.strictEqual(0, distance.point3d(p1, p1));
      assert.strictEqual(expected, distance.point3d(p1, p2));
      assert.strictEqual(expected, distance.point3d(p2, p1));
    });
  });
});
