/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const results = [];

  function backtrack(i, substr, partitioning) {
    if (i === s.length) {
      if (substr === "") {
        // we should only push partitioning if the whole string has been partitioned
        // but sometimes only part of the string was partitioned,
        // and the other part never formed a proper palindrome
        // in this case the i+1 call where i+1 === s.length will contain non empty str
        results.push([...partitioning]);
      }
      return;
    }

    const str = substr + s[i];

    if (isPalindrome(str)) {
      partitioning.push(str);
      // consider str part of the current partitioning
      // continue afresh from i+1
      backtrack(i + 1, "", partitioning);
      partitioning.pop();
      // pop from partitioning so we can pass str to form further partitions
    }

    backtrack(i + 1, str, partitioning);
  }

  function isPalindrome(substr) {
    if (substr === "") return false;

    let l = 0;
    let r = substr.length - 1;

    while (l <= r) {
      if (substr[l] !== substr[r]) {
        return false;
      }
      l += 1;
      r -= 1;
    }

    return true;
  }

  backtrack(0, "", []);

  return results;
};

/*
REACTO

Repeat
input:
    string s
output: 
    an array of arrays of strings
    where each array of string is a partitioning of s
    where each string is a palindrome

Example
"aab"
[["a", "a", "b"], ["aa", "b"]]
// two partitionings, in each partitioning every string is a palindrome

Approach

so what we know is that every single character is a palindrome
two characters are a palindrome if they are the same
three characters are a palindrome if edges are the same

so we can start at character "0"
it's a palindrome

then for character "1"
we can either try it on it's own
or with character "0"

so "0""1" and "1"
then

"0""1""2" and "2"

then "0""1""2""3"
how do I check if it's a palindrome in O(1)?

I wonder if we can do two pointer?
so initialize pointers in the middle
either both in the middle or left and right

aabcbe
l    r
mismatch
    aabcbe
     l   r
    aabcbe
    l   r 




l
r

    aabcbe
    lr
        aabcbe
        l r
        aabcbe
         lr
    aabcbe
     l
     r 
        aabcbe
         l
          r 
        aabcbe
          l
          r 







  lr

l===r? yes
now we can either
move left to the left (right stays)
move right to the right (left stays)

*/
