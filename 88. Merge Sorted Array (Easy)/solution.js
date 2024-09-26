/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let p = nums1.length - 1;
  let p1 = m - 1;
  let p2 = n - 1;

  // our main condition is all elements from nums2 are merged into nums1
  // meaning p2 (index in num2) became < 0
  while (p2 >= 0) {
    const num1 = nums1[p1];
    const num2 = nums2[p2];
    // it is possible that all elements in nums1 are greater than in nums2
    // meaning p1 will go < 0, while p2 is still at the last element of nums[2]
    // and you will stuck comparing nums2[p2] with undefined (nums1[-1])
    // since that comparison is always false, you will end up in an infinite loop,
    // hence check for p1 < 0, in this case always add num2 to nums[1]
    if (p1 < 0 || num2 > num1) {
      nums1[p] = num2;
      p2 -= 1;
    } else {
      nums1[p] = num1;
      p1 -= 1;
    }
    p -= 1;
  }

  return nums1;
};
