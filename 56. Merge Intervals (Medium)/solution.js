/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (v) {
  v.sort(([aStart, aEnd], [bStart, bEnd]) => {
    return aStart === bStart ? aEnd - bEnd : aStart - bStart;
  });

  let result = [v[0]];

  for (let i = 1; i < v.length; ++i) {
    const current = v[i];
    const last = result[result.length - 1];
    if (checkOverlap(last, current)) {
      result[result.length - 1] = mergeOverlappingIntervals(last, current);
    } else {
      result.push(current);
    }
  }

  return result;
};

function checkOverlap(i1, i2) {
  // check overlap of two intervals, i2 starts at the same time or later than i1
  // in this case, they overlap if i2 starts before or at the first interval end time
  return i2[0] <= i1[1];
}

function mergeOverlappingIntervals(i1, i2) {
  // merge two overlapping intervals, where i2 starts later or at the same time as i1
  // merged interval start time is i1[0], because it is either earlier than i2[0], or the same
  // merged interval end time is greater of two end times
  return [i1[0], Math.max(i1[1], i2[1])];
}
