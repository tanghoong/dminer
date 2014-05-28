'use strict';

/**
 * Generates a matrix from the given vector, using the given function.
 * @param {Array} data
 * @param {Function} fn
 * @return {Array[]} matrix
 */
exports.matrix = function (data, fn) {
  return data.map(function (a) {
    return data.map(function (b) {
      return fn(a, b);
    });
  });
};

/**
 * Returns the intersect of two arrays.
 * @param {Array} a First array.
 * @param {Array} b Second array.
 * @return {Array}
 */
exports.intersect = function (a, b) {
  return a.filter(function (e) {
    return b.indexOf(e) !== -1;
  });
};
