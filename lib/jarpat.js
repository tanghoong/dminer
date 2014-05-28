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
 * @return {array} The clusters.
 */
jarpat.clusters = function (data, j, k) {
  var indexes, dmatrix, nmatrix, labels;

  // get indexes
  indexes = Object.keys(data).map(Number);

  // generate distance matrix
  dmatrix = util.matrix(data, distance.array);

  // generate neighbor matrix
  nmatrix = indexes.map(function (ai) {
    var neighbors, max;
   
    // remove self and Infinity (cannot be neighbors)
    // sort by distance
    neighbors = indexes.filter(function (bi) {
      return bi !== ai && dmatrix[ai][bi] < Infinity;
    }).sort(function (bi1, bi2) {
      return dmatrix[ai][bi1] - dmatrix[ai][bi2];
    });

    // (up)scaling slice to (0, j)
    max = dmatrix[ai][neighbors[Math.min(j, neighbors.length - 1)]];
    return neighbors.filter(function (bi) {
      return dmatrix[ai][bi] <= max;
    });
  });

  // generate (cluster) labels
  labels = indexes;
  labels.forEach(function (ai) {
    nmatrix[ai].forEach(function (bi) {

      // neighbors of each other
      if (nmatrix[bi].indexOf(ai) !== -1) {

        // and has at least k common neighbors
        if (util.intersect(nmatrix[ai], nmatrix[bi]).length >= k) {
          labels[bi] = labels[ai];
        }
      }
    });
  });

  return labels;
};
