var TimeMap = function () {
  this.values = new Map();
  this.timestamps = new Map();
};

/**
 * if L is average length of key and value strings
 * then it takes O(L) time to hash the string and add it to map
 * so if M calls to set are done, O(M * L) time
 *
 * @param {string} key
 * @param {string} value
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
  if (!this.values.has(key)) {
    this.values.set(key, []);
    this.timestamps.set(key, []);
  }

  this.values.get(key).push(value);
  this.timestamps.get(key).push(timestamp);
};

/**
 * if L is the average length of key string
 * then accessing value by key in a map will take O(L) time (hashing the string)
 * if M is the number of set function calls, then
 * an array can have at most M elements
 * so binary searching that array is O(log M)
 * so if N calls to get are made, O(N * L * log M) time
 * we can improve it to O(N * (L + log M)) time if we access the array by key just once
 *
 * @param {string} key
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function (key, timestamp) {
  if (!this.values.has(key)) {
    return "";
  }

  // what are we looking for?
  // we need to find time that is equal to timestamp,
  // or less
  // so if arr[M] > timestamp, we need to move left, because arr[M] is a larger time, we don't want that and anything that follows
  // if arr[M] < timestamp, we need to try and move right, but we shouldn't discard M

  const arr = this.timestamps.get(key);

  let L = 0;
  let R = arr.length - 1;

  while (L + 1 < R) {
    const M = L + Math.floor((R - L) / 2);

    if (arr[M] === timestamp) {
      return this.values.get(key)[M];
    }

    if (arr[M] > timestamp) {
      // move left and discard arr[M]
      // because arr[M] is larger than timestamp,
      // and so is everything that is to the right of arr[M]
      R = M - 1;
    } else {
      // arr[M] is less than timestamp, so it may be a good fit,
      // but we need to check larger timestamps,
      // so move right, but don't discard arr[M]
      L = M;
    }
  }

  /*
    [1]
    L=0 R=0
    while loop does not run, 0+1 < 0 is false
    arr[L] condition returns "" if arr[L] > timestamp
    arr[R] (L=R) returns value

    [1,2]
    L=0 R=1
    while loop does not run, 0+1 < 1 is false
    arr[L] condition returns "" if 1 is too big
    arr[R] returns value if satisfies
    returns arr[L] value

    [1,2,3]
    L=0 R=2
    while loop runs 0+1 < 2
    M=1
    lets say L moves to M
    L=1 R=2
    while loop stops
    or if R moves to M-1
    L=0, R=0
    while loop stops
    */

  if (arr[L] > timestamp) {
    return "";
  }

  if (arr[R] <= timestamp) {
    return this.values.get(key)[R];
  }

  return this.values.get(key)[L];
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */

/*
REACTO

Repeat
time based kv store
one key, multiple values (different timestamp)
retrieve value at timestamp

   set(key: string, value: string, timestamp: number)
       store value at key and timestamp
   get(key: string, timestamp: number)
       return value at key, where timestamp of the value is <= timestamp
       if multiple values, return with largest value timestamp
       return "" if none

Example
set('foo', 'bar', 1)
get('foo', 1) // return bar (1 <= 1)
get('foo', 2) // return bar (1 <= 2)
get('foo', 0) // return "" (1 > 0)

set('foo', 'baz', 2)
get('foo', 2) // return baz (1 <= 2, 2 <= 2, but 2 > 1)

Approach
so what if
we create a map
where keys are strings we are passed as keys
and values are arrays
arrays of tuples [value, timestamp]
naturally, all map values will be sorted by timestamp ASC
because timestamps we are given are strictly increasing
so we can run binary search on the array
or we can have two maps
one with timestamps, one with keys
makes it a bit easier to run binary search


*/
