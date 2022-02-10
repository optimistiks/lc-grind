function heightChecker(heights: number[]): number {
  const expected = [...heights].sort((a, b) => a - b);
  return heights.reduce((sum, height, index) => {
    if (height !== expected[index]) {
      return sum + 1;
    }
    return sum;
  }, 0);
}
