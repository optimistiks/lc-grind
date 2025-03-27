/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let L = 0;
  let R = nums.length - 1;

  while (L < R) {
    const M = L + Math.floor((R - L) / 2);

    if (nums[M] === target) {
      return M;
    }

    if (nums[M] < nums[R]) {
      // right half is sorted
      if (target > nums[M] && target <= nums[R]) {
        // target is somewhere in the right half
        // discard nums[M] we know it's not the target
        L = M + 1;
      } else {
        // target is definitely not in the right half
        // and we know it's definitely not nums[M]
        R = M - 1;
      }
    } else if (nums[L] <= nums[M]) {
      // since we Math.floor M, it's possible that L === M, M !== R
      // for example [3, 1]
      // so we treat it as "left half sorted"
      // left half is sorted
      if (target >= nums[L] && target < nums[M]) {
        // target is somewhere in the left half
        // and we know it's not nums[M]
        R = M - 1;
      } else {
        // target is definitely not in the left half
        // and it's not nums[M]
        L = M + 1;
      }
    }
  }

  if (nums[L] !== target) {
    return -1;
  }

  return L;
};

/*
tc: O(log n)
sc: O(1)
*/

/*
REACTO

Repeat
input:
    integer array nums, sorted ASC, all values unique, array is rotated somehow
    integer target
output:
    index of target in the input array
O(log n) required complexity

Example
[4,5,6,7,0,1,2], target = 0
output: 4 (index of 0 is 4)

Approach
L=0 R=len-1
M=mid

target=6
target can be
    equal to nums[M]
        we found target (index=M)
    target > nums[M]
        if target is larger than mid, what half should we pick to continue
        [4,5,6,0,1,2,3] if mid=0
        here target > nums[M] && target > nums[R]
        so it's larger than the whole sorted half
        pick left half
        [2,3,4,5,6,0,1] if mid=5
        here target > nums[M] && target > nums[L]

        [6,3]
        L=0, R=1
        M=0
        target found

        [3,6]
        L=0 R=1
        M=0
        target > nums[M]
        nums[M] < nums[R]
        sorted half is right
        [6,2,3]
        L=0 R=2
        M=1
        target > nums[M]

        so determine sorted half
        if target is in there, move there
        otherwise move to the other half


        [3,1] target=1
        L=0 R=1
        M=0

        nums[M] < nums[R] false, right half not sorted
        nums[L] < nums[M] false, left half not sorted




            

*/
