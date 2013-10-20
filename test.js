/*jslint node: true */

require('./lib/global.js');

// test the Jarvis-Patrick clustering method (cli)
var dataset, jarpat, clusters;

// get input dataset
dataset = require('./dataset.json');

// get clusters
jarpat = require('./lib/jarpat.js');
clusters = jarpat.clusters(dataset, 2, 1);

// print clusters
clusters.forEach(function (cluster) {
    'use strict';
    console.log(cluster.map(function (index) {
        return dataset[index];
    }));
});
