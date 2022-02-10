function removeElement(nums: number[], val: number): number {
  let pos = 0;
  for (let i = 0; i < nums.length; ++i) {
    if (nums[i] !== val) {
      const temp = nums[pos];
      nums[pos] = nums[i];
      nums[i] = temp;
      ++pos;
    }
  }
  return pos;
}
