/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  // recursive with cache
  // --------------------

  // const cache = Array.from({ length: s.length }, () => Array.from({ length: t.length }))

  // const rec = (i, j) => {
  //     if (j === t.length) return 1
  //     if (i === s.length) return 0

  //     if (cache[i][j] != null) return cache[i][j]

  //     // characters match, so go into two branches: one where we move both pointers, and one where we move only s pointer
  //     if (s[i] === t[j]) {
  //         const result = rec(i + 1, j + 1) + rec(i + 1, j)
  //         cache[i][j] = result
  //         return result
  //     }

  //     // characters dont match, keep t pointer where it is and move s pointer
  //     const result = rec(i + 1, j)
  //     cache[i][j] = result
  //     return result
  // }

  // return rec(0, 0)
  // --------------------

  // 2D DP
  // --------------------

  /*
            r   a   b   b    i   t   _  t (j)
        r       3   3   3    1  1    
        a       3   3   3    1  1    
        b       0   3   3    1  1    
        b       0   1   2    1  1    
        b       0   0   1    1  1    
        i       0   0   0    1  1    
        t       0   0   0    0  1    
        -       0   0   0    0  0   1
       s (i)
    */

  // const dp = Array.from({ length: s.length + 1 }, () => Array.from({ length: t.length + 1 }, () => 0))

  // for (let i = 0; i <= s.length; ++i) {
  //     // whenever we covered all the characters in t, we found a subsequence
  //     dp[i][t.length] = 1
  // }

  // for (let j = t.length - 1; j >= 0; --j) {
  //     for (let i = s.length - 1; i >= 0; --i) {
  //         // do not use s[i], meaning increment i but not j
  //         dp[i][j] = dp[i + 1][j]
  //         if (s[i] === t[j]) {
  //             // use s[i], incrementing both i and j
  //             dp[i][j] += dp[i + 1][j + 1]
  //         }
  //     }
  // }

  // return dp[0][0]

  // --------------------

  // 1D DP
  // --------------------

  let dpRow = Array.from({ length: t.length + 1 }, () => 0);
  dpRow[t.length] = 1; // t="", result=1

  for (let i = s.length - 1; i >= 0; --i) {
    const newDpRow = Array.from({ length: t.length + 1 }, () => 0);
    dpRow[t.length] = 1;
    // consider characters in s from s[i] inclusive, onwards
    for (let j = t.length - 1; j >= 0; --j) {
      // how many distinct subsequences equal to t.slice(j) we can find?
      // first, get the result without considering s[i] (so j does not increment)
      newDpRow[j] = dpRow[j];
      // get the result with considering s[i], increment j
      if (s[i] === t[j]) {
        newDpRow[j] += dpRow[j + 1];
      }
    }
    dpRow = newDpRow;
  }

  return dpRow[0];

  // --------------------
};
