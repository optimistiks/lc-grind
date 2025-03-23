/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let L = 0;
  let R = nums.length - 1;

  while (L <= R) {
    const M = Math.floor((L + R) / 2);

    if (target < nums[M]) {
      R = M - 1;
    } else if (target > nums[M]) {
      L = M + 1;
    } else {
      return M;
    }
  }

  return -1;
};

/*
REACTO

Repeat
input: array of integers nums (sorted asc)
       integer target
find index of target, or -1 if does not exist
O(log n) required

Approach
binary search
*/
