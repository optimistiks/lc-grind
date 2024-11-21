var FreqStack = function () {
  this.map = {};
  this.freqMap = {};
  this.maxFreq = 0;
};

/**
 * @param {number} val
 * @return {void}
 */
FreqStack.prototype.push = function (value) {
  this.freqMap[value] = (this.freqMap[value] ?? 0) + 1;
  const freq = this.freqMap[value];
  this.map[freq] = this.map[freq] ?? [];
  this.map[freq].push(value);
  this.maxFreq = freq > this.maxFreq ? freq : this.maxFreq;
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function () {
  const value = this.map[this.maxFreq].pop();
  this.freqMap[value] -= 1;
  if (this.map[this.maxFreq].length === 0) {
    this.maxFreq -= 1;
  }
  return value;
};

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */
