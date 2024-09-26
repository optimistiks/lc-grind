/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (matrix, k) {
  const heap = [];

  // initialize by pushing first element of each row into heap
  // it's like we've been pushing every first element of every array in a similar task
  for (let i = 0; i < matrix.length; ++i) {
    heapPush(heap, [matrix[i][0], i, 0]);
  }

  // track how many elements we have popped from the heap,
  // we need to pop exactly k elements, or less if k > n*n
  let count = 0;

  // the last popped element will be here
  let popped = null;

  // stop when we have popped k element or the heap is empty
  while (count < k && heap.length > 0) {
    const [value, row, col] = heapPop(heap);
    popped = value;
    count += 1;
    // get the next element in the row our popped element is coming from
    // and put it into the heap
    if (matrix[row][col + 1] != null) {
      heapPush(heap, [matrix[row][col + 1], row, col + 1]);
    }
  }

  return popped;
};

const compare = (arr, i, j) => arr[i][0] < arr[j][0];
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
