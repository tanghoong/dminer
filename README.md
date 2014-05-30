# dminer

A minimal data mining module.

## Includes

 * Jarvis-Patrick clustering
 * KNN classification

## Installation

```Shell
$ npm install dminer
```

## Running unit tests, and JSLint validation

```Shell
$ npm test
$ npm run lint
```

## Examples

### Jarvis-Patrick clustering

```JavaScript
'use strict';

var jarpat = require('dminer').jarpat;

var dataset = [
  [111, 112, 113], [111, 112, 114], [111, 115, 113],
  [221, 222, 223], [221, 222, 224], [221, 225, 223],
  [331, 332, 333], [331, 332, 334], [331, 335, 333],
  [441, 442, 443]
];

jarpat.clusters(dataset, 2, 1); // => [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]

```

### KNN classification

```JavaScript
'use strict';

var Knn = require('dminer').knn;

var knn = new Knn();

knn.addDocument(1, [11, 12, 13])
   .addDocument(1, [11, 12, 14])
   .addDocument(1, [11, 14, 15])
   .addDocument(2, [21, 22, 23])
   .addDocument(2, [21, 22, 24])
   .addDocument(2, [21, 24, 25])
   .addDocument(3, [31, 32, 33])
   .addDocument(3, [31, 32, 34])
   .addDocument(3, [31, 34, 35]);

knn.classify([41, 42, 43], 5); // => []
knn.classify([11, 12, 16], 5); // => [1]
knn.classify([12, 22, 36], 5); // => [1, 2]
knn.classify([11, 21, 31], 9); // => [1, 2, 3]

```

### License
MIT
