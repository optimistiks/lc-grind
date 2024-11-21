/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let sum = Number.NEGATIVE_INFINITY;
  let maxSum = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < nums.length; ++i) {
    if (sum < 0) {
      sum = nums[i];
    } else {
      sum += nums[i];
    }
    maxSum = Math.max(sum, maxSum);
  }

  return maxSum;
};
