/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let start = 1;
    let end = n;
    let count = 0;

    while (start < end) {
      let mid = Math.floor(start + (end - start) / 2);
      count += 1;
      if (isBadVersion(mid)) {
        // we dont do end = mid - 1 here because
        // if mid is actually the first bad version,
        // doing -1 will shift us to the left of it,
        // and we will never return back to it
        end = mid;
      } else {
        start = mid + 1;
      }
    }

    return start;
  };
};
