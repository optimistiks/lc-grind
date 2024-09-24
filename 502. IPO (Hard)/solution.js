/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
var findMaximizedCapital = function (k, c, profits, capitals) {
  // in this heap we are going to store capitals that
  // are required by projects to invest into them
  // top element is always the cheapest project to invest to
  const capHeap = [];

  // in this heap we're going to store profits of projects
  // that we can afford to invest to
  // so project is either present in the capitals heap (above)
  // or in this profits heap, but not both
  const profitHeap = [];

  // push capitals required by projects to heap
  capitals.forEach((cap, index) => heapPush(capHeap, [cap, index]));

  // hold our total capital in a variable
  // we will be adding profits of projects here
  let myCap = c;

  // hold how many times we've invested
  // we stop investing when count reaches k
  let count = 0;

  // invest in project no more than k times
  // if there are no projects to invest, but count < k,
  // we just increment count
  while (count < k) {
    while (capHeap.length > 0) {
      // look at the smallest project capital to invest (heap top)
      const [cap, index] = capHeap[0];
      if (cap > myCap) {
        // if we can't invest into the cheapest project,
        // means we cannot invest in any other project,
        // since all other projects are more expensive
        break;
      }
      // remove the smallest project capital from the heap
      // the second smallest will take its place
      heapPop(capHeap);
      // push the project profit into the profits heap
      // we make the value negative so we dont need to implement
      // a separate max heap
      heapPush(profitHeap, [-profits[index], index]);
    }
    // at this point we've removed all projects that we can afford
    // from the capitals heap,
    // and added their profits to the profits heap
    // now we need to pick the top element from the profits heap
    // this will be the project that brings the most profit
    // out of all projects that we can afford at this step
    if (profitHeap.length > 0) {
      const [profit, index] = heapPop(profitHeap);
      // increase our total capital by adding the projects profit
      myCap = myCap - profit;
      // at this point our total capital is increased,
      // and on the next iteration we might afford more projects
      // from the capitals heap
    }
    // at this point we've either invested in a project,
    // or there were no projects we can afford to invest to,
    // increase our count anyway
    count += 1;
  }

  return myCap;
};

const compare = (arr, i, j) => arr[i][0] < arr[j][0];

const left = (i) => 2 * i + 1;
const right = (i) => 2 * i + 2;
const parent = (i) => Math.floor((i - 1) / 2);

const heapifyDown = (arr, i) => {
  let curr = i;
  while (left(curr) < arr.length) {
    let iMinChild =
      right(curr) < arr.length && compare(arr, right(curr), left(curr))
        ? right(curr)
        : left(curr);
    if (compare(arr, curr, iMinChild)) break;
    [arr[curr], arr[iMinChild]] = [arr[iMinChild], arr[curr]];
    curr = iMinChild;
  }
};

const heapifyUp = (arr, i) => {
  let curr = i;
  while (parent(curr) >= 0) {
    if (compare(arr, parent(curr), curr)) break;
    [arr[curr], arr[parent(curr)]] = [arr[parent(curr)], arr[curr]];
    curr = parent(curr);
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
