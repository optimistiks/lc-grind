/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let i = 0;

  // apply cyclic sort to place values at their indexes (e.g. value 2 goes to index 2)
  while (i < nums.length) {
    if (nums[i] !== i && nums[nums[i]] != null) {
      const tmp = nums[nums[i]];
      nums[nums[i]] = nums[i];
      nums[i] = tmp;
    } else {
      i += 1;
    }
  }

  // find first index that does not match it's value, it's the missing element
  const missing = nums.findIndex((element, index) => element !== index);

  return missing === -1 ? nums.length : missing;
};
