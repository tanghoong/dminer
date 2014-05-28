'use strict';

var util = require('./util');

/**
 * Distance metric functions.
 */
var distance = exports;

/**
 * Returns the distance between two arrays.
 * Distance = number of words outside their intersect.
 * @param {Array} a First array.
 * @param {Array} b Second array.
 * @return {number} Infinity if the intersect is empty, distance otherwise.
 */
distance.array = function (a, b) {
  var intersect = util.intersect(a, b);
  return intersect.length ? a.length + b.length - intersect.length * 2 : Infinity;
};
