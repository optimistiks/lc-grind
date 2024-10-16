/**
 * @param {string} num
 * @return {string}
 */
var largestPalindromic = function (num) {
  // build a map of frequencies for each digit in num
  const map = {};
  for (let i = 0; i < num.length; ++i) {
    map[num[i]] = map[num[i]] ?? 0;
    map[num[i]] += 1;
  }

  // we are going to find a first half of a palindrome, and a possible mid
  // a second half is just a reversed first half
  let firstHalf = "";
  let mid = "";

  // iterate each possible digit that could be present in num
  // if we don't have this digit in num, it's frequency will be 0, and it will be ignored
  for (let i = 9; i >= 0; --i) {
    const char = i.toString();
    if (map[char]) {
      if (firstHalf === "" && i === 0) {
        if (mid === "") {
          // a special case when we reached digit 0, and dont have a first half and mid, then just return "0"
          return "0";
        }
        // but if mid exists, do nothing, we don't want trailing zeros
      } else if (map[char] % 2 === 0) {
        // if frequency of the char is even, we can add half of them to the first half
        firstHalf += char.repeat(map[char] / 2);
      } else {
        // if frequency of the char is odd, we add smaller half of them to the first half
        // and the one leftover character we use as mid if needed
        firstHalf += char.repeat(Math.floor(map[char] / 2));
        if (mid === "") {
          mid = char;
        }
      }
    }
  }

  return `${firstHalf}${mid}${firstHalf.split("").reverse().join("")}`;
};
