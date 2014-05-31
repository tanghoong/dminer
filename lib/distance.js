'use strict';

var util = require('./util');

/**
 * Distance metric functions.
 */
var distance = exports;

/**
 * Returns the distance between two arrays.
 * Distance = number of words outside their intersect.
 * @param {Array} a1 First array.
 * @param {Array} a2 Second array.
 * @returns {number} Infinity if the intersect is empty, distance otherwise.
 */
distance.array = function (a1, a2) {
  var intersect = util.intersect(a1, a2);
  return intersect.length ? a1.length + a2.length - intersect.length * 2 : Infinity;
};

/**
 * Returns the distance between two points (2D).
 * @param {number[]} p1 First point ([x, y]).
 * @param {number[]} p2 Second point ([x, y]).
 * @returns {number}
 */
distance.point2d = function (p1, p2) {
  var xd, yd;
  xd = Math.pow(p1[0] - p2[0], 2);
  yd = Math.pow(p1[1] - p2[1], 2);
  return Math.sqrt(xd + yd);
};

/**
 * Returns the distance between two points (3D).
 * @param {number[]} p1 First point ([x, y, z]).
 * @param {number[]} p2 Second point ([x, y, z]).
 * @returns {number}
 */
distance.point3d = function (p1, p2) {
  var xd, yd, zd;
  xd = Math.pow(p1[0] - p2[0], 2);
  yd = Math.pow(p1[1] - p2[1], 2);
  zd = Math.pow(p1[2] - p2[2], 2);
  return Math.sqrt(xd + yd + zd);
};
