function sortArrayByParity(nums: number[]): number[] {
  let odd = nums.length - 1;
  for (let i = 0; i <= odd; ++i) {
    if (nums[i] % 2 !== 0) {
      const temp = nums[odd];
      nums[odd] = nums[i];
      nums[i] = temp;
      --odd;
      --i;
    }
  }
  return nums;
}
