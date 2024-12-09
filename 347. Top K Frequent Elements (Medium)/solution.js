const compare = (arr, i, j) => arr[i][1] < arr[j][1];
const left = (i) => 2 * i + 1;
const right = (i) => 2 * i + 2;
const parent = (i) => Math.floor((i - 1) / 2);

const heapifyDown = (arr, start) => {
  let i = start;
  while (left(i) < arr.length) {
    const iMinChild =
      right(i) < arr.length && compare(arr, right(i), left(i))
        ? right(i)
        : left(i);
    if (compare(arr, i, iMinChild)) break;
    [arr[i], arr[iMinChild]] = [arr[iMinChild], arr[i]];
    i = iMinChild;
  }
};

const heapifyUp = (arr, start) => {
  let i = start;
  while (parent(i) >= 0) {
    if (compare(arr, parent(i), i)) break;
    [arr[i], arr[parent(i)]] = [arr[parent(i)], arr[i]];
    i = parent(i);
  }
};

const heapPop = (arr) => {
  [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
  const v = arr.pop();
  heapifyDown(arr, 0);
  return v;
};

const heapPush = (arr, v) => {
  arr.push(v);
  heapifyUp(arr, arr.length - 1);
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  // build a frequency map in O(n) time, taking O(n) space
  const freq = new Map();
  for (const num of nums) {
    freq.set(num, (freq.get(num) ?? 0) + 1);
  }

  // create heap
  const heap = [];
  freq.forEach((freq, num) => {
    // maintain heap size k
    // this allows us to keep this section's time complexity within log(k)
    // so building a heap will take O(n log(k))
    if (heap.length < k) {
      heapPush(heap, [num, freq]);
    } else if (freq > heap[0][1]) {
      // heap size is k, and we know that it's a min heap
      // meaning top of the heap is the least frequent element currently in a heap
      // if the new incoming element is most frequent, and we know we only need k most frequent
      // it means we don't need that least frequent in the heap, we can discard it
      heapPop(heap);
      heapPush(heap, [num, freq]);
    }
  });

  // build a result array in O(k log(k)) time
  const result = [];
  for (let i = 0; i < k; ++i) {
    result.push(heapPop(heap)[0]);
  }

  return result;
};
