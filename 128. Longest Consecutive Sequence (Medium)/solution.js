/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  // brute force
  // let len = 0;
  // for (let num of nums) {
  //     let current = num
  //     let currentLen = 1;
  //     while (nums.includes(current + 1)) {
  //         current = current + 1
  //         currentLen = currentLen + 1
  //     }
  //     len = Math.max(len, currentLen)
  // }
  // return len

  // // sorting
  // if (nums.length === 0) return 0
  // nums.sort((a, b) => a - b)
  // // we now loop over a sorted array, if we find duplicates it means or sequence is neither broken nor extended
  // let current = nums[0]
  // let currentLen = 1
  // let maxLen = currentLen
  // for (let i = 1; i < nums.length; ++i) {
  //     if (nums[i] - current === 1) {
  //         current = nums[i]
  //         currentLen += 1
  //         maxLen = Math.max(currentLen, maxLen)
  //     } else if (nums[i] - current === 0) {
  //         continue
  //     } else {
  //         current = nums[i]
  //         currentLen = 1
  //     }
  // }
  // return maxLen

  // improved brute force
  // set allows for constant time lookups, and building a set is O(n), resulting in O(n) additional memory
  const numSet = new Set(nums);
  let maxLen = 0;
  for (const num of numSet) {
    // we are being clever about a number we want to start checking a sequence from
    // why would you want to start checking a sequence from number 5, if number 4 is in the set?
    // it would result in checking the same sequence twice
    // imagine that some array has a sequence of 4,5,6,7,8,9,102,101,100
    // you don't want to start checking from any number except 4 and 100 to avoid duplicate iterations
    if (numSet.has(num - 1)) continue;
    let len = 1;
    let current = num;
    while (numSet.has(current + 1)) {
      len += 1;
      current = current + 1;
    }
    maxLen = Math.max(len, maxLen);
  }
  return maxLen;
};

// brute force: we loop over all nums, inner while loop loops over all nums, and for each loop it calls includes
//  - so O(n^3)

// sorting: we sort the array, O(n log(n)), then we just do an O(n) loop, so O(n log(n)) total
// space is O(1) for brute and some depending on sort impl for sort

// improved brute force is O(n) time, O(n) space
// why O(n) time?
// the total number of nested while loop iterations is n, across all iterations of the outer loop,
// NOT n iterations per each iteration of outer loop (which would result in O(n^2))
// it's because we only start the while loop at the beginning of each sequence, and end it at the end of each sequence
