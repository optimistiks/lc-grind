function removeDuplicates(nums: number[]): number {
  let k = 0;
  for (let i = 0; i < nums.length; ++i) {
    nums[k] = nums[i];
    ++k;
    while (nums[i + 1] === nums[i]) {
      ++i;
    }
  }
  return k;
}
