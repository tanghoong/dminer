# dminer

A minimal data mining module.

## Includes

 * Distance metric functions
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

### Distance Metric Functions

#### Array Distance

```JavaScript
'use strict';

var distance = require('dminer').distance;

distance.array([1, 2], [1, 2]);       // => 0
distance.array([1, 2], [1, 2, 3]);    // => 1
distance.array([1, 2, 3], [1, 2, 4]); // => 2
distance.array([1, 2], [3, 4]);       // => Infinity
```

#### 2D Point Distance

```JavaScript
'use strict';

var distance = require('dminer').distance;

distance.point2d([3, 3], [3, 3]); // => 0
distance.point2d([3, 3], [6, 6]); // => ~ 4.2426 (sqrt 18)
distance.point2d([6, 6], [3, 3]); // => ~ 4.2426 (sqrt 18)
```

#### 3D Point Distance

```JavaScript
'use strict';

var distance = require('dminer').distance;

distance.point3d([3, 3, 3], [3, 3, 3]); // => 0
distance.point3d([3, 3, 3], [6, 6, 6]); // => ~ 5.1962 (sqrt 27)
distance.point3d([6, 6, 6], [3, 3, 3]); // => ~ 5.1962 (sqrt 27)
```

### Jarvis-Patrick Clustering

#### Default (Array) Distance

```JavaScript
'use strict';

var jarpat = require('dminer').jarpat;

var dataset = [
  [111, 112, 113], [111, 112, 114], [111, 115, 113],
  [221, 222, 223], [221, 222, 224], [221, 225, 223],
  [331, 332, 333], [331, 332, 334], [331, 335, 333],
  [441, 442, 443]
];

jarpat.clusters(dataset, 2, 1);
// => [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]
```

#### Custom (2D Point) Distance

```JavaScript
'use strict'

var dminer = require('dminer'),
  distance = dminer.distance,
  jarpat = dminer.jarpat;

// 3 triangles
var dataset = [
  [0, 0], [10, 0], [0, 10],
  [100, 100], [110, 100], [100, 110],
  [200, 200], [210, 200], [200, 210]
];

jarpat.clusters(dataset, 2, 1, distance.point2d);
// => [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
```

### KNN classification

#### Default (Array) Distance

```JavaScript
'use strict';

var Knn = require('dminer').knn;

var knn = new Knn();

knn.addDocument(0, [11, 12, 13])
   .addDocument(0, [11, 12, 14])
   .addDocument(0, [11, 14, 15])
   .addDocument(1, [21, 22, 23])
   .addDocument(1, [21, 22, 24])
   .addDocument(1, [21, 24, 25])
   .addDocument(2, [31, 32, 33])
   .addDocument(2, [31, 32, 34])
   .addDocument(2, [31, 34, 35]);

knn.classify([41, 42, 43], 5); // => []
knn.classify([11, 12, 16], 5); // => [0]
knn.classify([12, 22, 36], 5); // => [0, 1]
knn.classify([11, 21, 31], 9); // => [0, 1, 2]
```

#### Custom (2D Point) Distance

```JavaScript
'use strict';

var dminer = require('dminer'),
  distance = dminer.distance,
  Knn = dminer.knn;

var knn = new Knn();

knn.addDocument(0, [0, 0])
   .addDocument(0, [10, 10])
   .addDocument(0, [20, 20])
   .addDocument(1, [100, 100])
   .addDocument(1, [110, 110])
   .addDocument(1, [120, 120])
   .addDocument(2, [200, 200])
   .addDocument(2, [210, 210])
   .addDocument(2, [220, 220]);

knn.classify([30, 30], 3, distance.point2d);   // => [0]
knn.classify([60, 60], 3, distance.point2d);   // => [0, 1]
knn.classify([110, 110], 9, distance.point2d); // => [0, 1, 2]
```

### License

MIT
