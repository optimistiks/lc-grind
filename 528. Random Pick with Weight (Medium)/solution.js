/**
 * @param {number[]} w
 */
var Solution = function (w) {
  this.weights = w;
  // build an array of rolling sums
  this.sums = [];
  for (let i = 0; i < w.length; ++i) {
    const prevSum = this.sums[i - 1] || 0;
    this.sums.push(prevSum + w[i]);
  }
};

Solution.prototype.getRandomInt = function () {
  return Math.floor(Math.random() * this.sums[this.sums.length - 1]);
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function () {
  const rand = this.getRandomInt();
  let start = 0;
  let end = this.sums.length - 1;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    // we are looking for the first sum that is greater than rand
    // we found one that is greater, but were not sure if it's the first
    // so we shift end to be this position (mid) instead of mid-1 so we dont lose it
    if (this.sums[mid] > rand) {
      end = mid;
    } else {
      // this sum is less than or equal to rand, so we discard it, shifting left side to mid + 1
      start = mid + 1;
    }
  }

  return start;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */
