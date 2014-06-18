/*jslint node: true, indent: 2 */

'use strict';

/**
 * Returns the intersect of two arrays.
 * @param {Array} a1 First array.
 * @param {Array} a2 Second array.
 * @returns {Array}
 */
exports.intersect = function (a1, a2) {
  return a1.filter(function (e) {
    return a2.indexOf(e) !== -1;
  });
};
