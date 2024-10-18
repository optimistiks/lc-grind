/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
var makesquare = (matchsticks) => {
  matchsticks.sort((a, b) => b - a);
  // find total sum of matchsticks lengths
  const sum = matchsticks.reduce((sum, len) => sum + len, 0);
  // if sum cant be divided by 4 or there are less than 4 matchsticks, not possible
  if (sum % 4 !== 0 || matchsticks.length < 4) {
    return false;
  }
  // target is our square side length
  const target = sum / 4;
  // initialize sides lengths with zeros
  const sides = Array(4).fill(0);
  // start recursive calls by trying the first matchstick
  const result = build(matchsticks, 0, sides, target);
  return result;
};

function build(matchsticks, index, sides, target) {
  if (index === matchsticks.length) {
    // base case - all matchsticks were used, we have a square
    return true;
  }
  const len = matchsticks[index];
  // iterate all 4 sides, try to put the matchstick on any of them
  for (let i = 0; i < sides.length; ++i) {
    // new length of the side if we place the matchstick there
    const newLen = sides[i] + len;
    if (newLen <= target) {
      // if new length does not exceed our target length, we may consider placing the matchstick there
      sides[i] = newLen;
      // proceed to try the next matchstick
      const result = build(matchsticks, index + 1, sides, target);
      if (result) {
        return true;
      }
      sides[i] = sides[i] - len;
    }
  }
  return false;
}
