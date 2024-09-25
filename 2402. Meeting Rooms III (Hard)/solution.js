/**
 * @param {number} n
 * @param {number[][]} meetings
 * @return {number}
 */
var mostBooked = function (rooms, meetings) {
  // initialize min-heap of available rooms (store just room numbers from 0 to rooms-1)
  const avail = [];
  const compare = (arr, i, j) => arr[i] < arr[j];

  // initialize min-heap of rooms in use (stores tuples [room, end]) where room is a room number, end is an end time of a meeting in the room
  // comparator ensures rooms with lesser number are on top of rooms with a larger number (in case of end time tie)
  const used = [];
  const compareTuple = (arr, i, j) => {
    return arr[i][1] === arr[j][1]
      ? arr[i][0] < arr[j][0]
      : arr[i][1] < arr[j][1];
  };

  // initialize result array, where count[i] is the number of meetings held in room i
  const count = Array.from({ length: rooms }).fill(0);

  // fill the available rooms heap
  for (let i = 0; i < rooms; ++i) {
    heapPush(avail, i, compare);
  }

  // sort meetings by start time
  meetings = meetings.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < meetings.length; ++i) {
    let [start, end] = meetings[i];

    // we are now processing a meeting where start is a start time
    // lets move all used rooms whose meetings are ended to available heap
    // meeting ended = this meeting start time is after or the same as that meeting end time
    while (used.length > 0 && used[0][1] <= start) {
      heapPush(avail, heapPop(used, compareTuple)[0], compare);
    }

    // try to get an available room
    let room = avail[0];

    if (room == null) {
      // there are no available rooms

      // calculate this meeting duration
      const duration = end - start;

      // this meeting will start when the closest meeting will end
      const newStart = used[0][1];

      // shift this meeting end time accordingly
      const newEnd = newStart + duration;

      // schedule the delayed meeting
      // we only pop a single used room here, not all rooms with meetings ending before or at newStart
      // that is because on the next iteration, that room will be mistakingly considered available
      // even though it is only available at the adjusted time of this current meeting,
      // not necessarily at the time of the next meeting
      // so we only pop one room to schedule the current adjusted meeting
      // and leave the rest to the next meeting to figure out
      heapPush(avail, heapPop(used, compareTuple)[0], compare);
      room = heapPop(avail, compare);
      heapPush(used, [room, newEnd], compareTuple);
      count[room] += 1;
    } else {
      heapPush(used, [heapPop(avail, compare), end], compareTuple);
      count[room] += 1;
    }
  }

  // Replace this placeholder return statement with your code
  return count.indexOf(Math.max(...count));
};

const left = (i) => 2 * i + 1;
const right = (i) => 2 * i + 2;
const parent = (i) => Math.floor((i - 1) / 2);

const heapifyDown = (arr, start, compare) => {
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

const heapifyUp = (arr, start, compare) => {
  let i = start;
  while (parent(i) >= 0) {
    if (compare(arr, parent(i), i)) break;
    [arr[i], arr[parent(i)]] = [arr[parent(i)], arr[i]];
    i = parent(i);
  }
};

const heapPop = (arr, compare) => {
  [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
  const v = arr.pop();
  heapifyDown(arr, 0, compare);
  return v;
};

const heapPush = (arr, v, compare) => {
  arr.push(v);
  heapifyUp(arr, arr.length - 1, compare);
};
