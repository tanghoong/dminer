'use strict';

var dminer = require('../..'),
  distance = dminer.distance,
  jarpat = dminer.jarpat;

var dataset, clusters;

dataset = [
  [0, 10], [0, 0], [10, 0],
  [90, 0], [100, 0], [100, 10],
  [100, 90], [100, 100], [90, 100],
  [10, 100], [0, 100], [0, 90]
];

clusters = jarpat.clusters(dataset, 2, 1, distance.point2d);

clusters.forEach(function (cluster, ci) {
  console.log('cluster:', ci);
  cluster.forEach(function (index) {
    console.log(dataset[index]);
  });
});
