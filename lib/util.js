'use strict';

/**
 * Returns the intersect of two arrays.
 * @param {Array} a First array.
 * @param {Array} b Second array.
 * @returns {Array}
 */
exports.intersect = function (a, b) {
  return a.filter(function (e) {
    return b.indexOf(e) !== -1;
  });
};
