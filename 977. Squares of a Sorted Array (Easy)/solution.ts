function sortedSquares(nums: number[]): number[] {
  const negative: number[] = [];
  const positive: number[] = [];

  for (let i = 0; i < nums.length; ++i) {
    if (nums[i] < 0) {
      negative.push(nums[i] * nums[i]);
    } else {
      positive.push(nums[i] * nums[i]);
    }
  }

  const result: number[] = [];
  let negativeI = negative.length - 1;
  let positiveI = 0;

  while (result.length !== nums.length) {
    if (negativeI < 0) {
      for (let i = positiveI; i < positive.length; ++i) {
        result.push(positive[i]);
      }
    } else if (positiveI >= positive.length) {
      for (let i = negativeI; i >= 0; --i) {
        result.push(negative[i]);
      }
    } else {
      const a = negative[negativeI];
      const b = positive[positiveI];
      if (a < b) {
        result.push(a);
        --negativeI;
      } else {
        result.push(b);
        ++positiveI;
      }
    }
  }

  return result;
}
