/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  // the idea is: if I can reach n from n-1, and I can reach n-1 from n-x, it doesn't matter if I can actually reach n from n-x
  // because we don't need to minimize the amount of jumps
  // take last element as our target
  let target = nums.length - 1;
  // start iterating from the element preceding the last, backwards
  for (let i = nums.length - 2; i >= 0; --i) {
    const preceding = i;
    const diff = target - preceding;
    // the target element is reachable from the preceding element,
    // if preceding element value is greater or equal to the difference between target and preceding index
    // for example, element at index 5 is reachable from element at index 4 if value at index 4 is 1 or more
    // element at index 4 is reachable from element at index 1 if value at index 1 is 3 or more
    if (nums[preceding] >= diff) {
      // if target is reachable, make preceding element our new target
      target = preceding;
    }
  }
  // if we reached element at index 0, it means we have a path, otherwise we don't have a path
  return target === 0;
};
