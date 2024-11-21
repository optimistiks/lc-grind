/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (a, b) {
  // if length string b is greater than the length of string a, return an empty list
  if (b.length > a.length) return [];

  // list to store the output, i.e., start indexes of all anagrams of string b in string a
  let ans = [];

  // create the hash maps
  let hashA = new Map();
  let hashB = new Map();

  // populate hashB with the count of characters in string b
  for (let i = 0; i < b.length; i++) {
    hashB.set(b[i], (hashB.get(b[i]) || 0) + 1);
  }

  // traverse string a: in each iteration, move the window rightward by one character
  for (let windowEnd = 0; windowEnd < a.length; windowEnd++) {
    // to move the window rightward, add a new element in it, i.e.,
    // add this new element and its count in the hash map, hashA
    hashA.set(a[windowEnd], (hashA.get(a[windowEnd]) || 0) + 1);

    // if the length of the sliding window exceeds the length of string b,
    // make it equal to the length of string b by removing the left most element from the window, i.e.,
    // remove the left most element from the hash map, hashA
    if (windowEnd >= b.length) {
      // index of the left-most element in the sliding window
      let windowStart = windowEnd - b.length;

      // if the count of left-most element is 1, it means it is safe to delete it from the hash map, hashA
      if (hashA.get(a[windowStart]) == 1) {
        hashA.delete(a[windowStart]);
      }
      // if the count is greater than 1, then just remove one occurence of it from the hash map, hashA
      else {
        hashA.set(a[windowStart], (hashA.get(a[windowStart]) || 0) - 1);
      }
    }
    // if the count of characters in hashA equals the hashB, we got the anagram,
    // so append its start index to the output list
    if (isEqualMaps(hashA, hashB)) {
      let startIndex = windowEnd - b.length + 1;
      ans.push(startIndex);
    }
  }
  return ans;
};

// helper function that checks whether two hashmaps are same or not
function isEqualMaps(map1, map2) {
  if (map1.size !== map2.size) {
    return false;
  }
  for (let [key, value] of map1) {
    if (value !== map2.get(key)) {
      return false;
    }
  }
  return true;
}
