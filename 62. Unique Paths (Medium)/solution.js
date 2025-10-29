/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  // recursion, no memoization
  // const rec = (i, j) => {
  //     // check out of bounds
  //     if (i >= m) {
  //         // trying to access a non existing row (too far down)
  //         return 0
  //     }

  //     if (j >= n) {
  //         // trying to access a non existing col (too far right)
  //         return 0
  //     }

  //     if (i === m - 1 && j === n - 1) {
  //         // we reached bottom right
  //         return 1
  //     }

  //     return rec(i + 1, j) + rec(i, j + 1)
  // }

  // return rec(0, 0)

  // dp table
  // const dp = Array.from({ length: m }, () => Array.from({ length: n }, () => 0))

  // // prefill last row with 1
  // // from every cell in the last row, there is only one path to the bottom right
  // for (let col = 0; col < n; ++col) {
  //     dp[m - 1][col] = 1
  // }

  // // prefill last column with 1
  // // from every cell in the last col, there is only one path to the bottom right
  // for (let row = 0; row < m; ++row) {
  //     dp[row][n - 1] = 1
  // }

  // // now start at cell row=m-2, col=n-2
  // // and go first upwards (row=m-3, row=m-4 ...), then switch col=n-3 and again row=m-2...

  // for (let col = n - 2; col >= 0; --col) {
  //     for (let row = m - 2; row >= 0; --row) {
  //         dp[row][col] = dp[row + 1][col] + dp[row][col + 1]
  //     }
  // }

  // return dp[0][0]

  // what if we initialize only last row with 1s
  // then in the loop, we create a new row with last column prefilled
  // and finally replace row with this new row
  // this is initially a row m-1
  let dp = Array.from({ length: n }, () => 1);

  for (let row = m - 2; row >= 0; --row) {
    // row m-2, then row m-3, and so on
    // n - 1 column is always prefilled with 1
    const newDp = Array.from({ length: n }, () => 1);
    for (let col = n - 2; col >= 0; --col) {
      // same row, previous column: access newDp
      // previous row, same column: access dp
      newDp[col] = newDp[col + 1] + dp[col];
    }
    dp = newDp;
  }

  return dp[0];
};

/*
REACTO

REPEAT
given:
    mxn grid
    from top,left 0,0 to bottom,right m-1,n-1
    only down or right

return
    the number of unique paths

EXAMPLE

[
    [0,0]
    [0,0]
]
two unique paths

Approach


*/
