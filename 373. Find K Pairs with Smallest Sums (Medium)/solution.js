/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
var kSmallestPairs = function (list1, list2, k) {
  let result = [];

  const heap = [];

  // we initialize our heap by pairing the first element of list2
  // with every element of list1
  // since our arrays are sorted, our heap will contain our first min pair
  for (let i = 0; i < list1.length; ++i) {
    const a = list1[i];
    const b = list2[0];
    heapPush(heap, [a + b, i, 0]);
  }

  while (result.length < k && heap.length > 0) {
    // pop a min pair from the heap
    const [_, index1, index2] = heapPop(heap);
    result.push([list1[index1], list2[index2]]);
    // now we are going to push the next pair to the heap
    // the pair we've just popped is a minimum pair where list2[index2] is involved,
    // so now we need to consider list2[index2 + 1], and pair it with the same element from list1
    const nextA = list1[index1];
    const nextB = list2[index2 + 1];
    if (nextA != null && nextB != null) {
      // handle cases when either index is out of the array bounds
      heapPush(heap, [nextA + nextB, index1, index2 + 1]);
    }
  }

  return result;
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
