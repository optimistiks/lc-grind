var RangeModule = function () {
  this.intervals = [];
};

/**
 * @param {number} left
 * @param {number} right
 * @return {void}
 */
RangeModule.prototype.addRange = function (left, right) {
  // find first element that starts after left
  // insert element before that element
  const index = this.intervals.findIndex(([start, end]) => start > left);
  if (index === -1) {
    this.intervals.push([left, right]);
  } else {
    this.intervals.splice(index, 0, [left, right]);
  }
  // merge intervals
  const merged = [this.intervals[0]];
  for (let i = 1; i < this.intervals.length; ++i) {
    const prev = merged[merged.length - 1];
    const current = this.intervals[i];
    // we have half open intervals [) so if an interval ends at the same time the next interval starts, they dont overlap
    if (current[0] <= prev[1]) {
      prev[1] = Math.max(current[1], prev[1]);
    } else {
      merged.push(current);
    }
  }
  this.intervals = merged;
};

/**
 * @param {number} left
 * @param {number} right
 * @return {boolean}
 */
RangeModule.prototype.queryRange = function (left, right) {
  const first = this.intervals.find(
    ([start, end]) => start <= left && end >= right
  );
  return !!first;
};

/**
 * @param {number} left
 * @param {number} right
 * @return {void}
 */
RangeModule.prototype.removeRange = function (left, right) {
  const result = [];
  this.intervals.forEach(([start, end]) => {
    if (end < left) {
      result.push([start, end]);
    } else if (start > right) {
      result.push([start, end]);
    } else {
      if (start < left) result.push([start, left]);
      if (end > right) result.push([right, end]);
    }
  });
  this.intervals = result;
};

/**
 * Your RangeModule object will be instantiated and called as such:
 * var obj = new RangeModule()
 * obj.addRange(left,right)
 * var param_2 = obj.queryRange(left,right)
 * obj.removeRange(left,right)
 */
