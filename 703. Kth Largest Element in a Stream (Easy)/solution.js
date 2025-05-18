/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.k = k;
  this.heap = new MinPriorityQueue();

  nums.forEach((num) => {
    if (this.heap.size() < k) {
      // just fill up the heap until it's of size k
      this.heap.enqueue(num);
    } else if (this.heap.front() < num) {
      // if heap is of size k, only add num if it's larger than heap front
      // and pop the heap front to maintain size k
      this.heap.dequeue();
      this.heap.enqueue(num);
    }
  });
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  // only add val to heap if val is larger than the heap front
  // heap front - min element
  if (this.heap.size() < this.k) {
    this.heap.enqueue(val);
  } else if (this.heap.front() < val) {
    this.heap.dequeue();
    this.heap.enqueue(val);
  }

  return this.heap.front();
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

/*
REACTO

Repeat
   given:
       integer k: we need to keep track of kth highest score
       nums: initial scores
       add(val): new score, returns kth highest score

Example
k=2 nums [4,1,2,3]
add(5)
// scores 4 1 2 3 5 sorted scores 1 2 3 4 5 2nd highest is 4

Approach
we can maintain a heap of k largest values
how?
add first k values to min heap
top of the heap - the min of k values
so all other values are larger than k
so it's by definition the top k values (because we only saw k values)

now we want to add a new value
we want to pop from the heap if the top of the heap is smaller than the new value
because it means the top of the heap is not part of the new top k elements

*/
