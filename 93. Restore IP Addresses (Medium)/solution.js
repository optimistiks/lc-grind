/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const addresses = [];
  const segments = [];
  restoreIpRec(s, 0, 3, segments, addresses);
  return addresses;
};

function restoreIpRec(s, pos, dots, segments, addresses) {
  if (dots === 0) {
    // base case, dots === 0 meaning there are no dots left to place
    // (3 dots were placed, and segments contains only valid segments)
    // in this case our last segment (after 3rd dot) is still not validated
    // so we validate it and if it's valid, we form the ip address and add it to results
    const lastSegment = s.slice(pos);
    if (isValidSegment(lastSegment)) {
      addresses.push([...segments, lastSegment].join("."));
    }
    return;
  }
  // place next dot
  // initially to place the first dot, pos === 0, and dots === 3
  // dot can only be placed at positions +1, +2 and +3 from the last dot position (or in case of the first dot, from the 0th index)
  for (let i = pos + 1; i <= pos + 3; ++i) {
    // take segment that will be formed if we place dot at i
    const seg = s.slice(pos, i);
    if (isValidSegment(seg)) {
      // if the segment is valid, we add it to the list of segment
      // and we continue our recursion tree with dots-1 dots left to place
      segments.push(seg);
      restoreIpRec(s, i, dots - 1, segments, addresses);
      segments.pop();
    }
  }
}

function isValidSegment(seg) {
  return (
    seg.length <= 3 &&
    (seg[0] !== "0" || seg.length === 1) &&
    parseInt(seg) >= 0 &&
    parseInt(seg) <= 255
  );
}
