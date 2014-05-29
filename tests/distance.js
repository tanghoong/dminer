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
});
