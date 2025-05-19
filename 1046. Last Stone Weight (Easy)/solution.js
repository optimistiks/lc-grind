/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  const heap = MaxPriorityQueue.fromArray(stones);

  while (heap.size() > 1) {
    const y = heap.dequeue();
    const x = heap.dequeue();
    // x <= y
    if (x !== y) {
      heap.enqueue(y - x);
    }
  }

  return heap.size() > 0 ? heap.front() : 0;
};

/*
REACTO

Repeat
given:
    integer array stones
        stones[i] is the weight of ith stone
output:
    integer, weight of the last remaining stone, or 0 if no stones remaining
reduce stones by
    taking 2 heaviest one x and y where x <= y
    merging them
        x == y both gone
        x != y, y is now y-x

Approach
push all stones to max heap
get two from the top
merge them (if there is a leftover, push it back)
repeat until heap is size 1 or less 

*/
