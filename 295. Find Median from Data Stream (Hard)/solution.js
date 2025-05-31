var MedianFinder = function () {
  this.lowerHeap = new MaxPriorityQueue();
  this.largerHeap = new MinPriorityQueue();
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  if (num <= this.lowerHeap.front()) {
    this.lowerHeap.enqueue(num);
  } else {
    this.largerHeap.enqueue(num);
  }

  this._rebalance();
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  const size = this.lowerHeap.size() + this.largerHeap.size();

  if (size % 2 === 0) {
    return (this.lowerHeap.front() + this.largerHeap.front()) / 2;
  }

  return this.lowerHeap.front();
};

MedianFinder.prototype._rebalance = function () {
  // find total size
  const size = this.lowerHeap.size() + this.largerHeap.size();

  // what the diff should be between two heaps?
  // when even number of elements, the diff should be 0 - equal heaps
  // when odd number of elements, the diff should be 1 - lower heap larger by one
  const targetDiff = size % 2 === 0 ? 0 : 1;

  // find actual diff
  const diff = this.lowerHeap.size() - this.largerHeap.size();

  // do nothing if diff is correct
  if (diff === targetDiff) return;

  // when actual diff is greater than target,
  // it means lower heap is larger, move items to larger heap
  // otherwise it means lower heap is slower, move items from larger heap
  const from = diff > targetDiff ? this.lowerHeap : this.largerHeap;
  const to = diff > targetDiff ? this.largerHeap : this.lowerHeap;

  // move items until diff is correct
  while (this.lowerHeap.size() - this.largerHeap.size() !== targetDiff) {
    to.enqueue(from.dequeue());
  }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

/*
REACTO

Repeat
implement MedianFinder class
   addNum(int num) - adds num from the data stream
   findMedian - returns a median of all added numbers

Example:
   addNum(2)
   addNum(1)
   addNum(3)
   findMedian() (2)

Approach
so we need to some how maintain the sorted order of elements added (they can be added in any order)
is it like two heap?
max heap for lower half
min heap for larger half?

addNum(2)
   both heaps are empty
   add 2 to lower heap
   [2] []
addNum(1)
   1 is less than top of lower heap
   so 1 should go to lower heap
   [1,2] []
   heap sizes should be balanced
   meaning lower heap should be at most +1 of size of the larger heap
   now it's +2
   so move from lower to higher
   pop the front and push it to larger heap until balanced
   [1] [2]
addNum(3)
   3 is larger than top of the larger (min) heap
   so it should go to the larger heap
   [1] [2,3]
   invariant: length of lower heap should be equal to ceil(total length / 2)
   or: length of larger heap should be less than or equal to length of lower heap
   or: diff = lower.len - larger.len
       when equal: diff 0, dont do anything
       when diff 1, lower is one item larger than larger, dont do nothing
       when diff > 1, lower is more than one item larger, move from lower to larger
       when diff < 0, larger is higher, move until 0




*/
