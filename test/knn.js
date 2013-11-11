/*jslint node: true */

require('../lib/global.js');

// test the Jarvis-Patrick clustering method (cli)
var dataset, knn, clusters, labels;

// get classifier
knn = require('../lib/knn.js');

// training process
knn.addDocument(1, [11, 12, 13])
   .addDocument(1, [11, 12, 14])
   .addDocument(1, [11, 14, 15])
   .addDocument(2, [21, 22, 23])
   .addDocument(2, [21, 22, 24])
   .addDocument(2, [21, 24, 25])
   .addDocument(3, [31, 32, 33])
   .addDocument(3, [31, 32, 34])
   .addDocument(3, [31, 34, 35]);

// test perfect match (expected: [1])
labels = knn.classify([11, 12, 16], 5);
console.log(labels);

// test two matches (expected: [1, 2])
labels = knn.classify([11, 21, 36], 5);
console.log(labels);

// test three matches (expected: [1, 2, 3])
labels = knn.classify([11, 21, 31], 9);
console.log(labels);

// test no matches (expected: [])
labels = knn.classify([41, 42, 43], 5);
console.log(labels);
