'use strict';

var util = require('./util'),
  distance = require('./distance');

/**
 * A custom, (up)scaling implementation of the
 * Jarvis-Patrick clustering method.
 */
var jarpat = exports;

/**
 * Returns all the clusters can be generated from the given dataset.
 * @param {array} data Dataset have to be clustered.
 * @param {number} j Neighbors to examine (j >= 2).
 * @param {number} k Neighbors in common (k >= 1).
 * @param {?Function} getDistance Distance metric function, defaults to array.
 * @return {array} The clusters.
 */
jarpat.clusters = function (data, j, k, getDistance) {
  getDistance = getDistance || distance.array;
  var neighbors, labels, clusters;

  neighbors = data.map(function (a, ai) {
    return data.map(function (b, bi) {
      return [bi, getDistance(a, b)];
    }).sort(function (d1, d2) {
      return d1[1] - d2[2];
    }).filter(function (d) {
      return d[0] !== ai && isFinite(d[1]);
    }).filter(function (d, di, ds) {
      return d[1] <= ds[Math.min(j, ds.length - 1)][1];
    }).map(function (d) {
      return d[0];
    });
  });

  labels = Object.keys(data).map(Number);
  labels.forEach(function (ai) {
    neighbors[ai].forEach(function (bi) {
      if (neighbors[bi].indexOf(ai) !== -1
          && util.intersect(neighbors[ai], neighbors[bi]).length >= k) {
        labels[bi] = labels[ai];
      }
    });
  });

  clusters = labels.filter(function (l, li, ls) {
    return ls.indexOf(l) === li;
  }).map(function (label) {
    return Object.keys(labels).filter(function (li) {
      return labels[li] === label;
    }).map(Number);
  });

  return clusters;
};
