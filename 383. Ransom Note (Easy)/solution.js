/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  const map = {};
  for (let i = 0; i < magazine.length; ++i) {
    map[magazine[i]] = (map[magazine[i]] ?? 0) + 1;
  }

  let result = true;

  for (let i = 0; i < ransomNote.length; ++i) {
    if (map[ransomNote[i]] == null || map[ransomNote[i]] === 0) {
      return false;
    }
    map[ransomNote[i]] -= 1;
  }

  return result;
};
