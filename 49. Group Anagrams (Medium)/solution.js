/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  // the result, grouped anagrams, keys are sorte character counts like "#1#2#3"
  const groups = new Map();

  for (const str of strs) {
    // prepare array to store counts for 26 alphabet letters
    // it will be sorted by definition, index 0 is "a", index 25 is "z"
    const count = Array(26).fill(0);

    // for each character of the word, increment it's count
    for (const char of str) {
      count[char.charCodeAt(0) - "a".charCodeAt(0)] += 1;
    }

    // unique key that identifies an anagram
    let key = "";
    for (const num of count) {
      key += `#${num}`;
    }

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    // add word to group
    groups.get(key).push(str);
  }

  return Array.from(groups.values());
};

/*
K is maximum length of a string in strs
N is number of strings
we loop over chars in a string, so O(K)
we do it for each string, so O(NK)
the alphabet loop is constant
space O(NK), because keys in the resulting map are the same size as words
*/
