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
 * @returns {number} Infinity if the intersect is empty, distance otherwise.
 */
distance.array = function (a, b) {
  var intersect = util.intersect(a, b);
  return intersect.length ? a.length + b.length - intersect.length * 2 : Infinity;
};

/**
 * Returns the distance between two points (2D).
 * @param {number[]} a First point ([x, y]).
 * @param {number[]} b Second point ([x, y]).
 * @returns {number}
 */
distance.point2d = function (a, b) {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
};
