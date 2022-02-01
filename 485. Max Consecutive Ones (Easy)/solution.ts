function findMaxConsecutiveOnes(nums: number[]): number {
  const [max] = nums.reduce(
    ([max, current], num) => {
      return num === 1
        ? [max < current + 1 ? current + 1 : max, current + 1]
        : [max, 0];
    },
    [0, 0]
  );
  return max;
}
