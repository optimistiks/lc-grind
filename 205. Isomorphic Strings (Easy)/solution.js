/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (string1, string2) {
  // key: char from string1, value: char from string 2
  const map1 = {};
  // key: char from string 2, value: char from string 1
  const map2 = {};

  for (let i = 0; i < string1.length; ++i) {
    const char = string1[i];
    const mappedTo = string2[i];

    // check same letter mapped to multiple letters
    // it seems like char was added to map1 on previous iterations,
    // but it was mapped to a character that is different from mappedTo
    if (map1[char] && map1[char] !== mappedTo) {
      return false;
    }

    // check multiple letters mapped to same letter
    // char was not added to map1 before, however mappedTo was added to map2,
    // and something else rather than char is mapped to it
    if (map2[mappedTo] && map2[mappedTo] !== char) {
      return false;
    }

    map1[char] = mappedTo;
    map2[mappedTo] = char;
  }
  return true;
};
