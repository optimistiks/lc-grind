/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  let result = 0;

  const dp = Array.from({ length: s.length }, () =>
    Array.from({ length: s.length })
  );

  // prefill length=1
  for (let i = 0; i < s.length; ++i) {
    dp[i][i] = true;
    result += 1;
  }

  // prefill length=2
  for (let i = 1; i < s.length; ++i) {
    dp[i - 1][i] = s[i - 1] === s[i];
    if (dp[i - 1][i]) {
      result += 1;
    }
  }

  for (let length = 3; length <= s.length; length += 1) {
    // length goes: 3, 4, 5, 6 if s.length === 6

    for (let start = 0; start <= s.length - length; start += 1) {
      // start goes 0,1,2,3 if s.length=6 and length=3

      const end = start + length;
      // end goes from 3,4,5,6 if s.length=6 and length=3

      // so we have start and end that indicate indexes in s [start, end)
      // we check s[start] and s[end-1]
      // now we are left with [start+1, end-1)
      // we already checked in previously so
      // dp[start+1][end-2]

      // compare edges
      const edges = s[start] === s[end - 1];
      // check middle
      const middle = dp[start + 1][end - 2];

      if (edges && middle) {
        dp[start][end - 1] = true;
        result += 1;
      }
    }
  }

  return result;
};

/*
REACTO

Repeat
    given a string s
    return integer
        the number of palindromic substrings in s

Example
    "aaa"
    a a a aa aa aaa

Approach
if we have a 2-dim dp table
n * n
(0,0) tells us - is substring(0,0) a palindrome? yes, because it's a single character
(0,5) tells us - is substring (0,5) a palindrome?
so if n=6 the grid will be from 0 to 5
we need to include 5 so we need to query 0,6

so first we prefill 0,0 1,1 2,2 3,3 4,4 5,5
then 0,1 1,2 2,3 3,4 4,5

then we start the length loop that should go: 3,4,5,6
then left goes from: 
    3: 0 (0,3) to 6-len (3,6)
    4: 0 (0,4) to 2 (2,6)
for example (1,5) we check dp[1][1] and dp[4][4] and then we need to check (2,4) so dp[2][3]


*/
