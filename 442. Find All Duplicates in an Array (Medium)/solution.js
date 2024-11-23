/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
  let i = 0;

  while (i < nums.length) {
    if (i === nums[i] - 1) {
      i += 1;
    } else if (nums[i] === nums[nums[i] - 1]) {
      i += 1;
    } else {
      const temp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = temp;
    }
  }

  const result = [];
  for (let i = 0; i < nums.length; ++i) {
    if (i !== nums[i] - 1) {
      result.push(nums[i]);
    }
  }

  return result;
};
