/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (arr, t) {
  // start as normal binary search
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((high - low) / 2) + low;

    // if we found our target at mid, return true
    if (arr[mid] === t) {
      return true;
    }

    // mid may be in left or right halves
    if (arr[low] === arr[mid]) {
      low += 1;
      continue;
    }

    // here where it's different from normal binary search
    // since our array is rotated, we can't just blindly go right if t > arr[mid] (same for going left)
    // since our array is rotated, when we have mid, one half will always be sorted
    // so in order to go into one of the halves, two conditions should met
    // the half should be sorted, AND t should be in range of that half

    if (arr[low] < arr[mid]) {
      // if left half is sorted
      if (t >= arr[low] && t < arr[mid]) {
        // and if t belongs to the range of the left half,
        // shift our search to the left half
        high = mid - 1;
      } else {
        // shift to the right half otherwise
        low = mid + 1;
      }
    } else {
      // if right half is sorted
      if (t > arr[mid] && t <= arr[high]) {
        // and if t belongs to the range of the right half,
        // shift our search to the right half
        low = mid + 1;
      } else {
        // shift to the left half otherwise
        high = mid - 1;
      }
    }
  }

  // if at this point we didn't find anything, it means t is not in the arr
  return false;
};
