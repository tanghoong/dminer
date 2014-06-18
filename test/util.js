/*jslint node: true, indent: 2 */
/*global describe, it */

'use strict';

var assert = require('assert'),
  util = require('../lib/util');

describe('util', function () {

  describe('intersect', function () {

    it('should return the intersect of two arrays', function () {
      assert.deepEqual([2, 3], util.intersect([1, 2, 3], [2, 3, 4]));
    });

    it('should return an empty array', function () {
      assert.deepEqual([], util.intersect([1, 2], [3, 4]));
    });
  });
});
