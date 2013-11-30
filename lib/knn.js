/*jslint node: true */

require('./global.js');
var distance = require('./distance.js').array;

/**
 * A simple KNN algorithm implementaton.
 * @author Gabor Sar <gabor.sar@artoon.hu>
 */
var knn = exports;

/**
 * List of documents (training set).
 * @type {array}
 */
knn.documents = [];

/**
 * Adds a new document.
 * @param {string} label Label (class) of the document.
 * @param {array} content Content of the document.
 */
knn.addDocument = function (label, content) {
    'use strict';
    this.documents.push([label, content]);
    return this;
};

/**
 * Classifys a document, using the KNN method.
 * @param {array} content Content have to be classified.
 * @param {number} k Neighbors to examine (k >= 2).
 * @return {boolean|array} Labels (classes) of the document.
 */
knn.classify = function (content, k) {
    'use strict';

    var that = this, distances, neighbors, labels;

    // get distances between this and all other documents
    distances = this.documents.map(function (b, bi) {
        return [bi, distance(content, b[1])];
    });

    // get k nearest neighbors
    neighbors = distances.filterBy(1).sortBy(1).slice(0, k).column(0);

    // build labels [ label, number of neighbors ]
    // step 1 : contains the list of the closest neighbors' label
    // format : [ label1, label1, label2, ... ]
    labels = neighbors.map(function (i) {
        return that.documents[i][0];
    });

    // step 2 : contains the list of the closest label
    // format : [ [ label, neighbors in common ], ... ]
    labels = labels.unique().map(function (label) {
        return [label, labels.keys(label).length];
    }).sortBy(1, true);

    // step 3 : contains all the closest neighbors
    // format [ label1, label2, ... ]
    labels = labels.filter(function (label) {
        return label[0] >= labels[0][0];
    }).column(0);

    // return label(s)
    return labels;
};
