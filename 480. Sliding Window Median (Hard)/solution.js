/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var medianSlidingWindow = function (nums, k) {
  // nums array of numbers, k sliding window size
  // return median of every sliding window
  // basically we keep two heaps,
  // left heap is a max heap where all the numbers lt or equal to median are kept
  // right heap is a min heap where all the numbers gt than median are kept
  // this way sliding window median is always either left heap top, or avg of two tops
  // elements who exit the sliding window are ignored unless they pop to the top of either heap
  // then we drop them (we keep track of them leaving the window using a hashmap)
  // we also need to make sure that right heap contains exactly half of the current sliding window numbers,
  // so we rebalance the heaps if for example an element exited the window from the left heap, and entered to the right heap

  // max heap, elements lt or equal to current median
  const leftHeap = [];
  // min heap, elements gt than current median
  const rightHeap = [];

  // first push all elements of the initial window to the max heap
  for (let i = 0; i < k; ++i) {
    // we make min heap implementation behave like max heap by inverting the sign
    heapPush(leftHeap, -nums[i]);
  }

  // move half of the elements to the min heap
  for (let i = 0; i < Math.floor(k / 2); ++i) {
    heapPush(rightHeap, -heapPop(leftHeap));
  }

  const getMedian = () => {
    return k % 2 === 0 ? (-leftHeap[0] + rightHeap[0]) / 2 : -leftHeap[0];
  };

  // median of the initial sliding window
  const medians = [getMedian()];

  // start moving the sliding window
  // start points to the first element of the sliding window
  let start = 1;
  // end points to the last elements of the sliding window
  let end = k;
  // keep track of elements leaving the sliding window
  const outLog = {};

  // keep moving the sliding window forward until we reach the end of the array
  while (end < nums.length) {
    // an element who is leaving the window
    const leaving = nums[start - 1];
    // and element who is entering the window
    const entering = nums[end];
    // if balance is negative, we need to move elements from right to left heap
    // if balance is positive, we need to move elements from left to right heap
    // if balance is 0, rebalancing is not needed
    let balance = 0;

    // save leaving element to the log
    outLog[leaving] = (outLog[leaving] ?? 0) + 1;

    if (leaving <= -leftHeap[0]) {
      // element exited the left heap
      balance -= 1;
    } else {
      // element exited the right heap
      balance += 1;
    }

    if (entering <= getMedian()) {
      // new element entered the left heap
      heapPush(leftHeap, -entering);
      balance += 1;
    } else {
      // new element entered the right heap
      heapPush(rightHeap, entering);
      balance -= 1;
    }

    // handle rebalancing
    if (balance > 0) {
      heapPush(rightHeap, -heapPop(leftHeap));
    } else if (balance < 0) {
      heapPush(leftHeap, -heapPop(rightHeap));
    }

    // keep dropping elements from the top of either heap,
    // if those elements are recorded as exited the window on this step or on previous steps
    while (outLog[-leftHeap[0]] > 0) {
      outLog[-heapPop(leftHeap)] -= 1;
    }
    while (outLog[rightHeap[0]] > 0) {
      outLog[heapPop(rightHeap)] -= 1;
    }

    medians.push(getMedian());

    // slide the window forward
    start += 1;
    end += 1;
  }

  return medians;
};

const compare = (arr, i, j) => arr[i] < arr[j];
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
