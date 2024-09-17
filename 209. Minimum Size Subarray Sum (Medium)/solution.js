/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  // min length seen so far
  let length = 0;
  // current window sum
  let sum = 0;
  // left side of the window
  let start = 0;

  // i is right side of the window
  for (let i = 0; i < nums.length; ++i) {
    // add value to sum
    sum += nums[i];
    if (sum >= target) {
      // sum is greater or equal to target,
      // now try to minimize window fromthe left
      while (sum >= target) {
        sum -= nums[start];
        start += 1;
      }
      // the while loop has ended where we reduced the sum one step past the target
      // so calculate the new length with start-1
      const newLength = i + 1 - (start - 1);
      if (newLength < length || length === 0) {
        length = newLength;
      }
      // continue search from start
    }
  }

  return length;
};
