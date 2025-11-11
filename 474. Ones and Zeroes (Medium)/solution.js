/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  // recursive no memo
  // -----------------
  // const sizes = strs.reduce((acc, str) => {
  //     const size = str.split("").reduce((acc, str) => {
  //         if (str === "0") acc[0] += 1
  //         if (str === "1") acc[1] += 1
  //         return acc
  //     }, [0, 0])
  //     acc.set(str, size)
  //     return acc
  // }, new Map())

  // const dfs = (i, zeros, ones, size) => {
  //     if (i === strs.length) {
  //         if (zeros > m || ones > n) {
  //             // a subset in the current recursion branch is larger than required size
  //             return 0
  //         }
  //         return size
  //     }
  //     const str = strs[i]
  //     const strSize = sizes.get(str)
  //     // include str into subset
  //     // not include str into subset
  //     return Math.max(
  //         dfs(i + 1, zeros + strSize[0], ones + strSize[1], size + 1),
  //         dfs(i + 1, zeros, ones, size),
  //     )
  // }

  // return dfs(0, 0, 0, 0)
  // -----------------

  // 3D DFS
  // -----------------
  /*
        dp[0][0][0] = 0 - largest subset size when considering no elements, with m=0 and n=0
        consider "10" (m=1 n=1) for dp[1][1][1]
        if we take it, we should take dp[0][0][0] + 1, 
        or if we don't take it, we should take dp[0][1][1]
        so take max of those 2
        consider "10" (m=1 n=1) for dp[1][2][2]
        if we take it, we should take dp[0][1][1] + 1
        if we don't take it, we should take dp[0][2][2]
    */
  // const sizes = strs.reduce((acc, str) => {
  //     const size = str.split("").reduce((acc, str) => {
  //         if (str === "0") acc[0] += 1
  //         if (str === "1") acc[1] += 1
  //         return acc
  //     }, [0, 0])
  //     acc.set(str, size)
  //     return acc
  // }, new Map())

  // const dp = Array.from({ length: strs.length + 1 }, () =>
  //     Array.from({ length: m + 1 }, () =>
  //         Array.from({ length: n + 1 }, () => 0)
  //     )
  // )

  // for (let i = 1; i <= strs.length; ++i) {
  //     const str = strs[i - 1]
  //     const strSize = sizes.get(str)
  //     for (let zeros = 0; zeros <= m; ++zeros) {
  //         for (let ones = 0; ones <= n; ++ones) {
  //             // largest subset size if we don't include str
  //             dp[i][zeros][ones] = dp[i - 1][zeros][ones]
  //             // now we need to include, check if we even can include
  //             if (zeros >= strSize[0] && ones >= strSize[1]) {
  //                 dp[i][zeros][ones] = Math.max(
  //                     // don't include
  //                     dp[i][zeros][ones],
  //                     // include
  //                     dp[i - 1][zeros - strSize[0]][ones - strSize[1]] + 1
  //                 )
  //             }
  //         }
  //     }
  // }

  // return dp[strs.length][m][n]

  // -----------------

  // 2D DFS
  // -----------------
  const sizes = strs.reduce((acc, str) => {
    const size = str.split("").reduce(
      (acc, str) => {
        if (str === "0") acc[0] += 1;
        if (str === "1") acc[1] += 1;
        return acc;
      },
      [0, 0]
    );
    acc.set(str, size);
    return acc;
  }, new Map());

  /*
        we have a 2D table, m x n
        and then we start adding strs to our considered subarray
        and try to fit that string into a m x n condition, starting from the largest one
        so for example m=5 n=3
        "10"
        does "10" fit m=5 n=3? yes, what is left? m=4 n=2, dp[4][2] is zero because we started from the largest one
        if we would start from the smallest one, "10" would fit every size from m=1 n=1 upwards, which is incorect, that would be reusing "10" multiple times
    */

  const dp = Array.from({ length: m + 1 }, () =>
    Array.from({ length: n + 1 }, () => 0)
  );

  for (const str of strs) {
    const strSize = sizes.get(str);
    // no point to try to fit the str past it's own size
    // so for example if m=5 n=3 and the str size is m=2 n=2, m will go from 5 to 2
    for (let zeros = m; zeros >= strSize[0]; --zeros) {
      for (let ones = n; ones >= strSize[1]; --ones) {
        // include str? subtract str size and add one
        // exclude str? existing value
        dp[zeros][ones] = Math.max(
          dp[zeros][ones],
          dp[zeros - strSize[0]][ones - strSize[1]] + 1
        );
      }
    }
  }

  return dp[m][n];

  // -----------------
};
