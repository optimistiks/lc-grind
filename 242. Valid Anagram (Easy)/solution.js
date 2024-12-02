/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const map = new Map();

  for (let i = 0; i < str1.length; ++i) {
    const char1 = str1[i];
    map.set(char1, (map.get(char1) ?? 0) + 1);
    const char2 = str2[i];
    map.set(char2, (map.get(char2) ?? 0) - 1);
  }

  for (const key of map.keys()) {
    if (map.get(key) !== 0) return false;
  }

  return true;
};
