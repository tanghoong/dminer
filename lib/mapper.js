/*jslint node: true */

require('./global.js');
var distance = require('./distance.js').array;

/**
 * A basic mapper module.
 * @author Gabor Sar <gabor.sar@artoon.hu>
 */
var mapper = exports;

/**
 * Finds the most similar element(s)
 * of the given dataset to the given content/
 * @param {array} dataset
 * @param {array} content
 */
mapper.map = function (dataset, content) {
    'use strict';

    var distances, indexes, matches;

    // get distances
    distances = dataset.map(function (b, bi) {
        return [bi, distance(content, b)];
    }).filterBy(1).sortBy(1);

    // get indexes
    indexes = distances.filter(function (d) {
        return d[1] <= distances[0][1];
    }).column(0);

    // get and return matches
    matches = indexes.map(function (i) {
        return dataset[i];
    });
    return matches;
};
