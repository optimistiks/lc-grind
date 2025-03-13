/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    const regex = /[a-z0-9]/i;

    while (left < right && !regex.test(s[left])) left += 1;
    while (left < right && !regex.test(s[right])) right -= 1;

    // in case of all whitespaces for example,
    // the left will be moved all the way to the last whitespace
    // and the right will remain at the last whitespace
    // so we will end up comparing the whitespaces
    // which is fine, because if we just delete all non-alphanumerics,
    // an empty string is a palindrome

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left += 1;
    right -= 1;
  }

  return true;
};

/*
REACTO

Repeat
we are given a string
and need to return a boolean
if the string is a palindrome, true, otherwise false

palindrome: reads the same both ways

Example
"Race a car"
to lower case, remove non alphanumeric
"raceacar": false

Approach
Initialize first pointer at 0
last pointer at last character
make sure the character is a letter or a number, otherwise shift the pointer
compare characters at pointers
shift both if same
stop when pointers meet or cross

Code
Test
Optimize

*/

/*
O(n), O(1)
*/
