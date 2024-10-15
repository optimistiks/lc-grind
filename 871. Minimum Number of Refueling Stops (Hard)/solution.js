/**
 * @param {number} target
 * @param {number} startFuel
 * @param {number[][]} stations
 * @return {number}
 */
var minRefuelStops = function (target, startFuel, stations) {
  if (startFuel >= target) return 0;
  if (stations.length === 0) return -1;

  const heap = [];

  let maxDistance = startFuel;
  let stops = 0;

  for (let i = 0; i < stations.length; ++i) {
    const [dist, fuel] = stations[i];
    if (dist <= maxDistance) {
      // if we can reach this station, add it to heap
      // as soon as we see a station we cant reach
      // we will pop a station from the heap that gives us the most fuel
      heapPush(heap, -fuel);
      // while (i === stations.length - 1 && heap.length > 0 && maxDistance < target) {
      //     maxDistance += -heapPop(heap)
      //     stops += 1
      // }
    } else {
      if (heap.length === 0) {
        // dist to current station is larger than maxDistance we can travel
        // and there are no stations in the heap
        return -1;
      }
      console.log(
        `curr maxDistance ${maxDistance}, cant go to`,
        `[${dist},${fuel}], going to add heap top ${-heap[0]} to maxDistance ${maxDistance}`
      );
      // we cannot reach the current station
      // pop a station from the heap that gives us the most fuel
      maxDistance += -heapPop(heap);
      stops += 1;
      //
      i -= 1;
    }
  }

  // we can already reach target with the current number of stops
  if (maxDistance >= target) return stops;

  while (heap.length > 0 && maxDistance < target) {
    maxDistance += -heapPop(heap);
    stops += 1;
  }

  if (maxDistance < target) return -1;

  return stops;
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
