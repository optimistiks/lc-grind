/**
 * @param {string} s
 * @return {string}
 */
var reorganizeString = function (inputString) {
  // build a hash map where keys are characters, and values are their frequencies
  const map = {};
  for (let i = 0; i < inputString.length; ++i) {
    const char = inputString[i];
    map[char] = (map[char] ?? 0) + 1;
  }

  // initialize max heap by pushing character frequencies together with characters
  // so heap will always contain a character with max frequency value on top
  const uniqueChars = Object.keys(map);
  const heap = [];
  for (let i = 0; i < uniqueChars.length; ++i) {
    const char = uniqueChars[i];
    heapPush(heap, [-map[char], char]);
  }

  // store final result here
  let result = "";
  // store character we've just added to the result string here, with frequency
  // since we pop it from the heap, we don't add it to the heap right away
  // in order to avoid same adjacent characters in case some character frequency is much higher than the other
  let added = null;

  while (heap.length > 0) {
    // remove character with max frequency from heap
    const item = heapPop(heap);
    const freq = -item[0];
    const char = item[1];
    // add it to string
    result += char;

    // if we have a character that we've added on the previous step,
    // add it to the heap now
    if (added !== null) {
      heapPush(heap, added);
    }

    // calculate new frequency of the character we added at this step
    const newFreq = freq - 1;
    if (newFreq > 0) {
      // if new frequency is >0, save it to variable
      added = [-newFreq, char];
    } else {
      // otherwise reset variable
      added = null;
    }
  }

  // this variable being not null means we could not re-add all characters in a way that is required
  if (added !== null) {
    return "";
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
