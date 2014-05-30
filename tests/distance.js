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
      assert.strictEqual(0, distance.point2d([3, 3], [3, 3]));
      assert.strictEqual(Math.sqrt(72) / 2, distance.point2d([3, 3], [6, 6]));
      assert.strictEqual(Math.sqrt(72) / 2, distance.point2d([6, 6], [3, 3]));
    });
  });
});
