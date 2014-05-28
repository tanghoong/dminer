'use strict';

var assert = require('assert'),
  util = require('../lib/util');

describe('util', function () {

  describe('matrix', function () {

    it('should return a matrix', function () {
      var matrix = util.matrix([1, 2, 3], function (a, b) {
        return a + b;
      });
      assert.deepEqual([[2, 3, 4], [3, 4, 5], [4, 5, 6]], matrix);
    });
  });

  describe('intersect', function () {

    it('should return the intersect of two arrays', function () {
      assert.deepEqual([2, 3], util.intersect([1, 2, 3], [2, 3, 4]));
    });

    it('should return an empty array', function () {
      assert.deepEqual([], util.intersect([1, 2], [3, 4]));
    });
  });
});
