/*jslint node: true */

require('./global.js');
var distance = require('./distance.js').array;

/**
 * This is a custom, (up)scaling implementation of the
 * Jarvis-Patrick clustering method.
 * @author Gabor Sar <gabor.sar@artoon.hu>
 */
var jarpat = exports;

/**
 * Returns all the clusters can be generated from the given dataset.
 * @param {array} data Dataset have to be clustered.
 * @param {number} j Neighbors to examine (j >= 2).
 * @param {number} k Neighbos in common (k >= 1).
 * @return {array} The clusters.
 */
jarpat.clusters = function (data, j, k) {
    'use strict';
    var distances, neighbors, labels, clusters;

    // get distances between all items
    distances = data.map(function (a) {
        return data.map(function (b, bi) {
            return [bi, distance(a, b)];
        });
    });

    // collect all j nearest neighbors
    neighbors = distances.map(function (d) {
        return d.filterBy(1).sortBy(1).slice(0, j).column(0);
    });

    // assign items to clusters (label them)
    labels = Object.keys(data);
    neighbors.forEach(function (ad, ai) {
        ad.forEach(function (bi) {
            var ba, kc, bd = distances[bi];
            // b have (or could have) a in it's j nearest neighbors
            ba = bd[ai][1] <= bd[neighbors[bi].last()][1];
            // a and b have at least k neighbors in common
            kc = k <= ad.intersect(neighbors[bi]).length;
            // a and b are in the same cluster = a's label have to be
            // the same as b's label
            if (ba && kc) {
                labels = labels.replace(labels[ai], labels[bi]);
            }
        });
    });

    // build and return clusters
    clusters = labels.unique().map(labels.keys.proxy(labels));
    return clusters;
};
