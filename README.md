# dminer

A minimal data mining module.

## Includes

 * Jarvis-Patrick clustering
 * KNN classification

## Installation

```Shell
$ npm install dminer
```

## Running Tests

Install dev dependencies.
```Shell
$ npm install
```

Run tests.
```Shell
$ npm test
```

Check code quality.
```Shell
$ npm run lint
```

## Examples

### Jarvis-Patrick clustering

#### Array Distance (default)

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

#### 2D Point Distance

```JavaScript
'use strict'

var dminer = require('dminer'),
  distance = dminer.distance,
  jarpat = dminer.jarpat;

var dataset = [
  [0, 10], [0, 0], [10, 0],
  [90, 0], [100, 0], [100, 10],
  [100, 90], [100, 100], [90, 100],
  [10, 100], [0, 100], [0, 90]
];

jarpat.clusters(dataset, 2, 1, distance.point2d); // => [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]]
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
