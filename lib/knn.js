'use strict';

var util = require('./util'),
  distance = require('./distance');

/**
 * A simple KNN implementaton.
 * @property {Array} documents
 */
var Knn = module.exports = function () {

  if (!(this instanceof Knn)) {
    return new Knn();
  }

  /**
   * Array of documents ([label, content]).
   * @var {Array} documents
   */
  this.documents = [];
};

/**
 * Adds a new document.
 * @param {number} label
 * @param {Array} content
 * @returns self
 */
Knn.prototype.addDocument = function (label, content) {
  this.documents.push([label, content]);
  return this;
};

/**
 * Classifys a document.
 * @param {Array} content
 * @param {number} k
 * @param {function} getDistance
 * @returns {number[]}
 */
Knn.prototype.classify = function (content, k, getDistance) {
  getDistance = getDistance || distance.array;
  var self = this, neighborLabels, bestLabels;

  neighborLabels = this.documents.map(function (d, di) {
    return [di, getDistance(content, d[1])];
  }).filter(function (d) {
    return isFinite(d[1]);
  }).sort(function (d1, d2) {
    return d1[1] - d2[1];
  }).filter(function (d, di, ds) {
    return d[1] <= ds[Math.min(k, ds.length) - 1][1];
  }).map(function (d) {
    return self.documents[d[0]][0];
  });

  bestLabels = neighborLabels.filter(function (l, li, ls) {
    return ls.indexOf(l) === li;
  }).map(function (label) {
    return [label, neighborLabels.filter(function (l) {
      return l === label;
    }).length];
  }).sort(function (c1, c2) {
    return c1[1] - c2[1];
  }).filter(function (c, ci, cs) {
    return c[1] >= cs[0][1];
  }).map(function (c) {
    return c[0];
  });

  return bestLabels;
};
