/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
  // so we can count the letters in the string
  // if some letter appears even number of times
  // we can use all of them in the palindrome
  // if some letter appears odd number of times
  // we can use it times-1 number of times
  // we should also add one if we have at least one letter that appears one time or odd times

  const hashMap = {};

  for (let i = 0; i < s.length; ++i) {
    const char = s[i];
    hashMap[char] = (hashMap[char] ?? 0) + 1;
  }

  let plusOne = false;
  let maxLen = 0;

  Object.keys(hashMap).forEach((char) => {
    const qty = hashMap[char];
    if (qty % 2 === 0) {
      maxLen += qty;
    } else if (qty > 1) {
      plusOne = true;
      maxLen += qty - 1;
    } else if (qty === 1) {
      plusOne = true;
    }
  });

  if (plusOne) {
    maxLen += 1;
  }

  return maxLen;
};
