/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  // function to check if an arbitrary range [i, j] in s is a palindrome
  const checkPalindrome = (i, j) => {
    console.log("if", s[i], "-", s[j], "a palindrome");
    while (i < j) {
      if (s[i] !== s[j]) return false;
      i += 1;
      j -= 1;
    }
    return true;
  };
  let start = 0;
  let end = s.length - 1;
  while (start < end) {
    // we found a mismatched pair, now the string is a palindrome if and only if,
    // either a substring with character at "start" removed is a palindrome
    // or a substring with character at "end" is removed
    if (s[start] !== s[end])
      return checkPalindrome(start + 1, end) || checkPalindrome(start, end - 1);
    start += 1;
    end -= 1;
  }
  // otherwise a whole s is a palindrome
  return true;
};
