/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  return nums.reduce((value, num) => num ^ value, 0);
};
