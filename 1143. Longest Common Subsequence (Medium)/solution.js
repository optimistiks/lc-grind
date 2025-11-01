/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  // brute force recursive
  // let max = -Infinity

  // const rec = (p1, p2, len) => {
  //     if (len > max) {
  //         max = len
  //     }

  //     if (p1 === text1.length || p2 === text2.length) {
  //         return
  //     }

  //     if (text1[p1] === text2[p2]) {
  //         rec(p1 + 1, p2 + 1, len + 1)
  //     } else {
  //         rec(p1 + 1, p2, len)
  //         rec(p1, p2 + 1, len)
  //     }
  // }

  // rec(0, 0, 0)

  // return max

  // dp 2D
  // const dp = Array.from(
  //     { length: text1.length + 1 },
  //     () => Array.from(
  //         { length: text2.length + 1 }
  //         , () => 0
  //     )
  // )

  // for (let i = 0; i < text1.length; ++i) {
  //     for (let j = 0; j < text2.length; ++j) {
  //         const match = text1[i] === text2[j]
  //         // if we matched we must not reuse the same letter
  //         if (match) {
  //             dp[i + 1][j + 1] = dp[i][j] + 1
  //         } else {
  //             dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j])
  //         }
  //     }
  // }

  // return dp[text1.length][text2.length]

  // dp 1D

  if (text2.length > text1.length) {
    [text1, text2] = [text2, text1];
  }

  // text1 is the largest string

  let dpPrev = Array.from({ length: text2.length + 1 }, () => 0);
  let dpCurr = Array.from({ length: text2.length + 1 }, () => 0);

  for (let i = 0; i < text1.length; ++i) {
    for (let j = 0; j < text2.length; ++j) {
      const match = text1[i] === text2[j];
      if (match) {
        dpCurr[j + 1] = dpPrev[j] + 1;
      } else {
        dpCurr[j + 1] = Math.max(dpCurr[j], dpPrev[j + 1]);
      }
    }
    [dpPrev, dpCurr] = [dpCurr, dpPrev];
  }

  return dpPrev[dpPrev.length - 1];
};

/*
REACTO

Repeat
given
    text1: string
    text2: string
return
    int: length of longest subseq
    0 if there are none

Example
zazczez abcde

[0..0]"z" [0..0]"a" LCS=0
[0..0]"z" [0..1]"ab" LCS=0
...
[0..0]"z" [0..4]"abcde" LCS=0

[0..1]"za" [0..0]"a" LCS=1
    p1="a" p2="a" =1 
    now check [0..0] [0..-1]
[0..1]"za" [0..1]"ab" LCS=1
    p1="a" p2="b"
    check [0..0] [0..1] "z" "ab" (0)
    check [0..1] [0..0] "za" "a" (1)
    take max, and add 1 if match ,0 if mismatch










for p1 = 0 to p1 length
    for p2 = 0 to p2 length
        p1=0 p2=0 z != a (0) dp[0][0] = 0
        p1=0 p2=1 b != z (0) dp[0][1] = 0
        ... fill all dp[0] with 0
        p1=1 p2=0 a == a (1) dp[1][0] = 1 + dp[0][-1?] (0)
        p1=1 p2=1 a != b (0) dp[1][1] = 0
        ... fill the rest of dp[1] with 0




    z a z c z e z
a   0             
b                 
c
d
e



Approach
pointer1=0 pointer2=0
compare z and a (mismatch)
now we need two branches
    pointer1=0 pointer2=1
        compare z and a
    pointer1=1 pointer2=0
        compare a and a
        match
        pointer1=2 pointer1=1
            z != b
            pointer1=2 pointer2=2
            pointer1=3 pointer2=1
                c != b
                pointer1=3 pointer2=2
                    c == c
                    match
                    pass length 2
                pointer1=4 pointer2=1

"acezzzzzzzzz"
"acezzzzzzzzz"

 */
