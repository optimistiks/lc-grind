function findNumbers(nums: number[]): number {
  return nums.reduce((count, num) => {
    if (num.toString().length % 2 === 0) {
      return count + 1;
    }
    return count;
  }, 0);
}
