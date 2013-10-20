/*jslint node: true */

require('./global.js');

/**
 * Distance metric functions.
 * @author Gabor Sar <gabor.sar@artoon.hu>
 */
var distance = exports;

/**
 * Returns the distance between two arrays.
 * Distance = number of words outside their intersect.
 * @param {array} a The first array.
 * @param {array} b The second array.
 * @return {boolean|number} Returns false if a is b,
 * or if their intersect is empty, distance otherwise.
 */
distance.array = function (a, b) {
    'use strict';
    var i = a.intersect(b).length;
    return (a === b || i === 0) ? false : a.length + b.length - i * 2;
};
