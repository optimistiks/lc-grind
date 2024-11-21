/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  nums.sort((a, b) => a - b);
  const quadruplets = [];
  kSum(nums, target, 4, 0, quadruplets);
  return quadruplets;
};

function kSum(nums, target, k, start, results, current) {
  if (k === 2) {
    // solve two sum with two pointers

    let left = start;
    let right = nums.length - 1;

    while (right > left) {
      const sum = nums[left] + nums[right];
      if (sum > target) {
        // reduce sum by shifting right to the left
        right = right - 1;
      } else if (sum < target) {
        // increase sum by shifting left to the right
        left = left + 1;
      } else {
        // at this point nums[left] and nums[right] sum up to target
        // it also means that elements in current and nums[left] and nums[right] sum up to the original target
        // so we found our k-let
        results.push([...current, nums[left], nums[right]]);
        // we found a combination, but we may have more
        // so continue by shifting left (we might as well shift right)
        // also prevent duplicates by skipping the same values
        left = left + 1;
        while (right > left && nums[left] === nums[left - 1]) {
          // skip elements that are the same so we avoid duplicates
          left = left + 1;
        }
      }
    }

    return;
  }

  for (let i = start; i < nums.length - k + 1; ++i) {
    if (i > start && nums[i] === nums[i - 1]) {
      // skip elements that are the same so we avoid duplicates
      continue;
    }
    // we pass i+1 as start because we are at element i,
    // and we consider adding this element into the quadruplet,
    // so we need to look at elements that go after element i
    kSum(nums, target - nums[i], k - 1, i + 1, results, [
      ...(current ?? []),
      nums[i],
    ]);
  }
}
