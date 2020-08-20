const fi = (function() {
    return {
        libraryMethod: function() {
            return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
        },

        each: function(collection, callback) {
            let result = collection;
            for (const item in collection) {
                callback(collection[item], item, collection);
            }
            return result;
        },

        map: function(collection, callback) {
            let result = [];
            for (const item in collection) {
                result.push(callback(collection[item], item, collection));
            }
            return result;
        },

        reduce: function(collection, callback, acc) {
            let accumulator = acc ? acc : collection[0];
            let index = acc ? 0 : 1;
            for (; index < collection.length; index++) {
                accumulator = callback(accumulator, collection[index], collection);
            }

            return accumulator;
        },
        find: function(collection, callback) {
            for (const item in collection) {
                if (callback(collection[item])) return collection[item];
            }
            return undefined;
        },
        filter: function(collection, callback) {
            let result = [];
            for (const item in collection) {
                if (callback(collection[item])) result.push(collection[item]);
            }
            return result;
        },
        size: function(collection) {
            return Object.keys(collection).length;
        },
        first: function(array, n) {
            if (n) {
                let result = []
                for (let i = 0; i < n; i++) {
                    result.push(array[i]);
                }
                return result;
            } else {
                return array[0];
            }
        },
        last: function(array, n) {
            if (n) {
                let result = [];
                for (n = array.length - n; n < array.length; n++) {
                    result.push(array[n]);
                }
                return result;
            } else return array[array.length - 1];
        },
        compact: function(array) {
            let result = [];
            let length = array.length;
            for (let i = 0; i < length; i++) {
                if (array[i]) result.push(array[i]);
            }
            return result;
        },
        sortBy: function(array, callback) {
            let newArr = [...array];
            return newArr.sort((a, b) => callback(a) - callback(b));
        },
        unpack: function(receiver, arr) {
            for (let val of arr)
                receiver.push(val)
        },
        flatten: function(collection, shallow, newArr = []) {
            if (!Array.isArray(collection)) return newArr.push(collection)
            if (shallow) {
                for (let val of collection)
                    Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
            } else {
                for (let val of collection) {
                    this.flatten(val, false, newArr)
                }
            }
            return newArr
        },
        uniq: function(array, isSorted, iteratee = false) {
            let result = [];
            // console.log(isSorted);
            if (isSorted) {
                // console.log(isSorted)
                result = array;
                for (let i = 0; i < result.length; i++) {
                    console.log('result: ' + result);
                    console.log('index: ' + i);
                    console.log('item: ' + result[i])
                    if (result[i] == result[i + 1]) {
                        result.splice(i + 1, 1);
                        i--;
                    }
                }
            } else if (iteratee) {
                return Array.from(new Set(array));
            } else {
                for (let i = 0; i < array.length; i++) {
                    if (!this.find(result, function(item) { return item === array[i] })) result.push(array[i]);
                }
            }
            return result;
        },
        keys: function(obj) {
            let result = [];
            for (const key in obj) {
                result.push(key);
            }
            return result;
        },
        values: function(obj) {
            let result = [];
            for (const key in obj) {
                result.push(obj[key]);
            }
            return result;
        },
        functions: function(obj) {
            let result = [];
            for (const key in obj) {
                if (typeof obj[key] == 'function') result.push(key);
            }
            return result.sort();
        },


    }
})()

fi.libraryMethod()
    // var stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
    // fi.sortBy(stooges, function(stooge) { return stooge.name })
console.log(
    fi.flatten([1, [2, 3],
        [
            [4, 5], 6, [7, [8, 9]]
        ]
    ])
);

// let unpack = function(receiver = [], arr) {
//     for (let val of arr)
//         receiver.push(val)
//     return receiver
// }
// let unpacked = unpack([], [
//     [1],
//     [2],
//     [3],
//     [2, 3, [2]]
// ]);
// console.log(unpacked)
