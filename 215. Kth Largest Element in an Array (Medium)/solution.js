/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const heap = new MinPriorityQueue();

  for (const num of nums) {
    if (heap.size() < k) {
      heap.enqueue(num);
    } else if (num > heap.front()) {
      heap.dequeue();
      heap.enqueue(num);
    }
  }

  return heap.front();
};
