/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  /* O(n^2) solution: run first loop on every character of s (and second loop on every pair) */
  /* run second loop on expanding a string and checking if it's a palindrome */
  /* better than brute force O(n^3): outer loop on lengths, inner loop on moving the length across s, third loop on checking if it's a palindrome */
  const check = (i, j) => {
    let left = i;
    let right = j;

    while (s[left] != null && s[right] != null && s[left] === s[right]) {
      left -= 1;
      right += 1;
    }
    // take between left and right, not including left and right
    // because left and right were expanded one more time after last palindrome
    return s.slice(left + 1, right);
  };

  let result = "";

  for (let i = 0; i < s.length; ++i) {
    // every s[i] is the middle of a palindrome
    const palindrome = check(i, i);
    if (palindrome.length > result.length) {
      result = palindrome;
    }
  }

  for (let i = 0; i < s.length - 1; ++i) {
    // every s[i]s[i+1] is the middle of a palindrome
    const palindrome = check(i, i + 1);
    if (palindrome.length > result.length) {
      result = palindrome;
    }
  }

  return result;
};

/*
REACTO

Repeat
given string s of digits and english letters
return longest palindromic substring
substring - contiguous non-empty sequence within a string
palindromic - reads the same from both sides

Example
"babad"
"bab" or "aba"

Approach
how do we determine if a string is a palindrome
0 char string is a palindrome
1 char string is a palindrome
2 char string is a palindrome if chars are equal
we put two pointers left and right and move them forward

"babad"
consider every letter a middle of a palindrome
consider every pair of letters a middle of a palindrome

"b" is a palindrome
    (can't continue, left is out of bounds)
"a" is a palindrome
    "bab" is a palindrome
        (can't continue, left is OOB)
"b" is a palindrome
    "aba" is a palindrome
        "babad" is not a palindrome
            (stop)
"a" is a palindrome
    "bad" is not a palindrome
        (stop)
"d" is a palindrome
    (can't continue, left is OOB)

"ba" is not a palindrome
"ab"
"ba"
"ad"


*/
