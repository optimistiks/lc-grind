/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let L = 0;
  let R = nums.length - 1;

  while (L < R) {
    const M = L + Math.floor((R - L) / 2);

    if (nums[M] < nums[R]) {
      // this indicates that [M-R] half is sorted
      // so minimum is either nums[M], or elements to the left of nums[M]
      R = M;
    } else {
      // here nums[M] >= nums[R]
      // it can only be if nums[M] is part of a larger sorted half [L-M]
      // so we discard mid and continue looking in [M+1, R]
      L = M + 1;
    }
  }

  return nums[L];
};

/*
REACTO

Repeat
given an array of length n
    sorted ASC
    rotated between 1 and n times
        example: [0,1,2,4,5,6,7]
            rotated 4 times: [4,5,6,7,0,1,2]
    elements are unique
return min element

Example
    [3,4,5,1,2]
    min element is 1
    (array was rotated 3 times, original array [1,2,3,4,5])

Approach
    sorted array - binary search?
    rotated - binary search with an additional check?

so with binary search we have L, R and M
we need to find min
min is located exactly at the end of rotated portion

M

nums[L] < nums[M] < nums[R]
    search space is fully in sorted half, return nums[L]

nums[L] < nums[M] > nums[R]
    [L-M] is sorted, [M-R] is not
    we should pick smaller half
    if nums[L] < nums[R]


*/
