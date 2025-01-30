var MinStack = function () {
  this.stack = [];
  /* 
    in mins we store pairs [a,b]
    a is the value
    b is how many times this minimum was repeated when new values were pushed
    this is to avoid storing duplicate values in mins
    
    b is only incremented if the same minimum is pushed
    it is not incremented when the minimum is unchanged because pushed value is larger
    */
  this.mins = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.stack.push(val);

  if (this.getMin() == null || val < this.getMin()) {
    this.mins.push([val, 1]);
  } else if (val === this.getMin()) {
    this.incrementMinCount(1);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const val = this.stack.pop();

  if (val === this.getMin()) {
    this.incrementMinCount(-1);
    if (this.getMinCount() === 0) {
      this.mins.pop();
    }
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.getMinPair()?.[0];
};

MinStack.prototype.getMinCount = function () {
  return this.getMinPair()[1];
};

MinStack.prototype.incrementMinCount = function (val) {
  this.getMinPair()[1] += val;
};

MinStack.prototype.getMinPair = function () {
  return this.mins[this.mins.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

/*
tc: O(1) for each op
sc: O(2n) 
 */
