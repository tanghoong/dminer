/*jslint node: true */

/**
 * Give more power to JavaScript.
 * @author Gabor Sar <gabor.sar@artoon.hu>
 */

/**
 * Extends an object's prototype with a method.
 * @param {string} name
 * @param {function} func
 * @return {object}
 */
global.Object.prototype.method = function (name, func) {
    'use strict';
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};

/**
 * Executes a provided function once per object porperty.
 * @param {function} callback
 * @return {object}
 */
global.Object.method('forEach', function (callback) {
    'use strict';
    var key;
    for (key in this) {
        if (this.hasOwnProperty(key)) {
            callback(this[key], key, this);
        }
    }
    return this;
});

/**
 * Merges the content of a given object into this object.
 * @param {object} object
 * @return {object}
 */
global.Object.method('extend', function (object) {
    'use strict';
    var that = this;
    object.forEach(function (value, key) {
        if (!that.hasOwnProperty(key)) {
            that[key] = value;
        }
    });
    return that;
});

/**
 * Curry pattern implementation.
 * @return {function}
 */
global.Function.method('curry', function () {
    'use strict';
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;
    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});

/**
 * Proxy pattern implementation.
 * @param {function} thisArg
 * @return {function}
 */
global.Function.method('proxy', function (thisArg) {
    'use strict';
    var that = this;
    return function () {
        return that.apply(thisArg, arguments);
    };
});

/**
 * Checks if a value exists in the array.
 * @param {mixed} value
 * @return {boolean}
 */
global.Array.method('has', function (value) {
    'use strict';
    return this.indexOf(value) !== -1;
});

/**
 * Returns the array's first element.
 * @return {mixed}
 */
global.Array.method('first', function () {
    'use strict';
    return this[0];
});

/**
 * Returns the array's last element.
 * @return {mixed}
 */
global.Array.method('last', function () {
    'use strict';
    return this[this.length - 1];
});

/**
 * Computes the intersection of this array and the given array.
 * @param {array} array
 * @return {array}
 */
global.Array.method('intersect', function (array) {
    'use strict';
    return this.filter(array.has.proxy(array));
});

/**
 * Replaces the given value's all occurences in the array.
 * @param {mixed} from
 * @param {mixed} to
 * @return {array}
 */
global.Array.method('replace', function (from, to) {
    'use strict';
    return this.map(function (value) {
        return (value === from) ? to : value;
    });
});

/**
 * Returns a unique version of the array
 * (all values contained once).
 * @return {array}
 */
global.Array.method('unique', function () {
    'use strict';
    return this.filter(function (element, index, thisArg) {
        return thisArg.lastIndexOf(element) === index;
    });
});

/**
 * Return the values from a single column in the array.
 * @param {number|string} key
 * @return {array}
 */
global.Array.method('column', function (key) {
    'use strict';
    return this.map(function (element) {
        return element[key];
    });
});

/**
 * Returns all the keys of the given value in the array.
 * @param {mixed} value
 * @return {array}
 */
global.Array.method('keys', function (value) {
    'use strict';
    var keys = [];
    this.forEach(function (value2, key) {
        if (value === value2) {
            keys.push(key);
        }
    });
    return keys;
});

/**
 * Sorts the array (array of arrays) by the given key.
 * @param {number|string} key
 * @return {array}
 */
global.Array.method('sortBy', function (key) {
    'use strict';
    return this.sort(function (a, b) {
        return a[key] - b[key];
    });
});

/**
 * Filters the array (array of arrays) by the given key and value.
 * @param {number|string} key
 * @param {mixed} value
 */
global.Array.method('filterBy', function (key, value) {
    'use strict';
    value = value || false;
    return this.filter(function (item) {
        return item[key] !== value;
    });
});

/**
 * Counts the occurences of the given value in the array.
 * @param {mixed} value
 * @return {number}
 */
global.Array.method('count', function (value) {
    'use strict';
    return this.filter(function (value2) {
        return value === value2;
    }).length;
});
