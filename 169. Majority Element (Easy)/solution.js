/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let max = [null, -Infinity];
  const map = {};
  for (let i = 0; i < nums.length; ++i) {
    const num = nums[i];
    map[num] = map[num] ?? 0;
    map[num] += 1;
    if (map[num] > max[1]) {
      max = [num, map[num]];
    }
  }
  return max[0];
};
