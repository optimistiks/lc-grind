/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
  // so mid should be always even
  // why
  // because when its even, and the next element is equal,
  // it means all previous elements are equal too
  // its because the length of the array is always odd
  let start = 0;
  let end = nums.length - 1;

  while (start < end) {
    let mid = Math.floor((end - start) / 2) + start;
    // make mid always even
    if (mid % 2 !== 0) {
      mid -= 1;
    }
    if (nums[mid] !== nums[mid + 1]) {
      // we know mid is even, so check if mid+1 element equals mid
      // if not, it means our target is in the left half
      end = mid;
    } else {
      // we know mid is even, so check if mid+1 element equals mid
      // if yes, it means all elements before mid are doubles as well
      // so we discard everything including mid+1 and move start forward
      start = mid + 2;
    }
  }

  return nums[start];
};
