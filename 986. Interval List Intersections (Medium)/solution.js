/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
var intervalIntersection = function (intervalListA, intervalListB) {
  const result = [];
  // pointer that goes through list a
  let ptrA = 0;
  // pointer that goes through list b
  let ptrB = 0;
  while (ptrA < intervalListA.length && ptrB < intervalListB.length) {
    const a = intervalListA[ptrA];
    const b = intervalListB[ptrB];

    const intersection = getIntersection(a, b);
    if (intersection[0] <= intersection[1]) result.push(intersection);

    // we know that our interval a ends before interval b ends,
    // we also know that next interval b starts after interval b ends
    // it means the next interval b will never intersect with current interval a
    // however, the next interval a may intersect with the current interval b
    // because we know next interval a starts after current interval a ends,
    // and current interval b ends after current interval a ends,
    // meaning there is a window (a.end, b.end] where the next interval a could start,
    // that will cause it to overlap with the current interval b

    if (a[1] <= b[1]) {
      ptrA += 1;
    } else {
      ptrB += 1;
    }
  }

  return result;
};

function getIntersection(a, b) {
  // get intersection, an interval that is fully included in both a and b
  return [Math.max(a[0], b[0]), Math.min(a[1], b[1])];
}
