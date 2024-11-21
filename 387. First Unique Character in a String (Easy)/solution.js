/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const map = {};

  for (let i = 0; i < s.length; ++i) {
    const char = s[i];
    map[char] = (map[char] ?? 0) + 1;
  }

  let result = -1;

  for (let i = 0; i < s.length; ++i) {
    const char = s[i];
    if (map[char] === 1) {
      result = i;
      break;
    }
  }

  return result;
};
