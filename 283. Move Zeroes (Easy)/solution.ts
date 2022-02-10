/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  let zeroIndex = 0;

  for (let index = 0; index < nums.length; index++) {
    if (nums[index] !== 0) {
      const temporary = nums[index];
      nums[index] = nums[zeroIndex];
      nums[zeroIndex] = temporary;

      zeroIndex++;
    }
  }
}
