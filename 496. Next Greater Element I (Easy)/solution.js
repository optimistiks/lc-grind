/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const ans = [];
  // monotonic stack
  const stack = [];
  const map = {};

  nums2.forEach((num) => {
    if (stack.length === 0) {
      stack.push(num);
      return;
    }

    // we pop all elements from the stack that are less than or equal to num
    // for all of them, num is the next greater element
    // suppose our arr is [2,1,5,4]
    // our stack is going to be [2] [2,1] then [5]
    // because for both 2 and 1, 5 is the next greater element
    while (stack.length > 0 && num > stack[stack.length - 1]) {
      map[stack.pop()] = num;
    }

    stack.push(num);
  });

  while (stack.length > 0) {
    map[stack.pop()] = -1;
  }

  nums1.forEach((num) => {
    ans.push(map[num] ?? -1);
  });

  return ans;
};
