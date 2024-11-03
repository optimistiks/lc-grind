/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
  // times[i] = (xi, yi, ti)
  // k - starting node
  // n = total nodes
  // so we need an adj list
  // a priority queue
  // a visited set
  // and a result variable

  // build an adjacency list from the times array
  // keys are nodes, values are arrays of tuples indicating outgoing edges,
  // each tuple is a pair of [node, time]
  const list = times.reduce((acc, [vFrom, vTo, time]) => {
    if (!acc[vFrom]) {
      acc[vFrom] = [];
    }
    acc[vFrom].push([vTo, time]);
    return acc;
  }, {});

  // initialize pq with [node, time] where node is starting node and time is 0
  const pq = [[k, 0]];

  // keep visited nodes in a set
  const visited = new Set();

  let result = 0;

  // now the dijkstra algorithm
  // we are going to pop a tuple with the min time (min heap rule)
  // we are going to push all directly connected nodes of the popped node into pq with the times
  // which means we're going to visit all shortest connections first

  while (pq.length > 0) {
    // pop the next node we're going to visit (due to min heap, a node with shortest time)
    const [v, t] = heapPop(pq);
    if (!visited.has(v)) {
      // mark node as visited
      visited.add(v);
      // update result value with the new time
      result = Math.max(result, t);
      // if there are any outgoing edges from the node we're visiting
      if (list[v]) {
        // add a child node to the priority queue
        // but set time to not just the time of the edge itself (from v to vc)
        // it's time of the edge itself + current result time
        list[v]
          .map(([vc, tc]) => [vc, result + tc])
          .forEach((item) => heapPush(pq, item));
      }
    }
  }

  // if we haven't visited all the nodes, it means there is no solution, some nodes don't have incoming edges
  if (visited.size !== n) {
    return -1;
  }

  return result;
};

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
