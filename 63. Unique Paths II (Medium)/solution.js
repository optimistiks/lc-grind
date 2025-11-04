/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (grid) {
  /* recursive with memoization */
  // -----------------------------
  // const m = grid.length
  // const n = grid[0].length

  // const cache = Array.from({ length: m }, () => Array.from({ length: n }, () => null))

  // const dfs = (row, col) => {
  //     if (grid[row] == null || grid[row][col] == null) {
  //         // out of bounds
  //         return 0
  //     }

  //     if (grid[row][col] === 1) {
  //         // obstacle
  //         return 0
  //     }

  //     if (row === m - 1 && col === n - 1) {
  //         // bottom left
  //         return 1
  //     }

  //     if (cache[row][col] !== null) {
  //         return cache[row][col]
  //     }

  //     const result = dfs(row + 1, col) + dfs(row, col + 1)
  //     cache[row][col] = result

  //     return cache[row][col]
  // }

  // return dfs(0, 0)
  // -----------------------------

  /* 2D DFS */
  // -----------------------------
  // prefill last row and last col, respecting the obstacles
  // then in a loop fill the rest, moving upwards-leftwards, respecting the obstacles

  // const m = grid.length
  // const n = grid[0].length

  // const dp = Array.from({ length: m }, () => Array.from({ length: n }, () => 0))

  // // set bottom left cell result as 0 if the cell itself is an obstacle
  // dp[m - 1][n - 1] = grid[m - 1][n - 1] === 1 ? 0 : 1

  // for (let col = n - 2; col >= 0; --col) {
  //     // in the last row, start from the second rightmost cell,
  //     // if it's an obstacle, set 0
  //     // otherwise copy the value from the cell on the right
  //     dp[m - 1][col] = grid[m - 1][col] === 1 ? 0 : dp[m - 1][col + 1]
  // }

  // for (let row = m - 2; row >= 0; --row) {
  //     // in the last col, start from the second bottommost cell
  //     // if it's an obstacle, set 0
  //     // otherwise copy the value from the cell below
  //     dp[row][n - 1] = grid[row][n - 1] === 1 ? 0 : dp[row + 1][n - 1]
  // }

  // // navigate each col upwards until 0, then switch col leftwards and repeat
  // for (let col = n - 2; col >= 0; --col) {
  //     for (let row = m - 2; row >= 0; --row) {
  //         if (grid[row][col] === 1) {
  //             // if obstacle ignore everything and set 0
  //             dp[row][col] = 0
  //         } else {
  //             dp[row][col] = dp[row + 1][col] + dp[row][col + 1]
  //         }
  //     }
  // }

  // return dp[0][0]
  // -----------------------------

  /* 1D DP */
  // -----------------------------
  const m = grid.length;
  const n = grid[0].length;

  // initially this represents the last row from the 2D dp table
  let dpRow = Array.from({ length: n }, () => 0);

  if (grid[m - 1][n - 1] !== 1) {
    // if target cell is not an obstacle, initialize it's result with 1
    dpRow[n - 1] = 1;
  }

  // finish initializing the last dp row
  for (let col = n - 2; col >= 0; --col) {
    dpRow[col] = grid[m - 1][col] === 1 ? 0 : dpRow[col + 1];
  }

  for (let row = m - 2; row >= 0; --row) {
    // loop starts at second to last row
    // after cols are iterated, dp representation of this row replaces the previous dp row

    const newDpRow = Array.from({ length: n }, () => 0);
    // copy the value from the last col, emulating the pre-filled last col from 2D DP
    newDpRow[n - 1] = grid[row][n - 1] === 1 ? 0 : dpRow[n - 1];

    for (let col = n - 2; col >= 0; --col) {
      if (grid[row][col] === 1) {
        newDpRow[col] = 0;
      } else {
        // row below is the dpRow
        // col on the right is in the same newDpRow
        newDpRow[col] = dpRow[col] + newDpRow[col + 1];
      }
    }

    dpRow = newDpRow;
  }

  return dpRow[0];
  // -----------------------------
};

/*
REACTO

Repeat

input
    grid int[][] mxn
    start: 0,0 top left
    finish m-1,n-1 bottom right
    only down or right allowed
    cell value 1 means obstacle
return
    int number of unique paths from start to finish

Example

Approach

0,0
    out of bounds: return 0
    obstacle: return 0
    bottom right: return 1

    return go right 0,1 + go down 1,0

*/
