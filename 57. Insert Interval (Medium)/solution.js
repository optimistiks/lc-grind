/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (existingIntervals, newInterval) {
  if (existingIntervals.length === 0) {
    return [newInterval];
  }
  // keep our resulting intervals here
  let result = [];

  // whether or not we added the new interval into the result array
  let isAdded = false;

  for (let i = 0; i < existingIntervals.length; ++i) {
    const curr = existingIntervals[i];
    if (curr[0] < newInterval[0]) {
      // if existing interval starts before the new interval, just add the existing one
      // because our intervals in the result are sorted by start time, just as in the input array
      result.push(curr);
    } else {
      // otherwise, the existing interval starts at new interval start time, or some time later, maybe even after the new interval
      // so it is about time we add our new interval to the array
      // check if we already added the new interval
      if (!isAdded) {
        // if not, take a look at the interval we added to result last
        const last = result[result.length - 1];
        // check if last interval overlaps with new interval
        if (last && isOverlap(last, newInterval)) {
          // if yes, merge the last interval with the new one, and replace in the result
          result[result.length - 1] = merge(last, newInterval);
        } else {
          // if no overlap, just push new interval
          result.push(newInterval);
        }
        // remember that we added the new interval
        isAdded = true;
      }
      // now do the same with the interval we're currently at - check if it overlaps with the last one
      // the last one may be the new interval we've added before
      const last = result[result.length - 1];
      if (isOverlap(last, curr)) {
        result[result.length - 1] = merge(last, curr);
      } else {
        result.push(curr);
      }
    }
  }

  if (!isAdded) {
    // if after the for loop we still haven't added the new interval to result
    // it means newInterval starts after the very last interval ends
    // so we just push it to the end
    if (isOverlap(result[result.length - 1], newInterval)) {
      result[result.length - 1] = merge(result[result.length - 1], newInterval);
    } else {
      result.push(newInterval);
    }
  }

  return result;
};

function isOverlap(a, b) {
  return b[0] <= a[1];
}

function merge(a, b) {
  return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
}
