/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumMoves = function (grid) {
  // hold coordinates of empty cells
  let zeros = [];
  // hold coordinates of cells with more than 1 stone, with a number of extra stones
  let extras = [];
  // initialize the result
  let minMoves = Infinity;

  let totalStones = grid.reduce(
    (sum, row) => sum + row.reduce((a, b) => a + b, 0),
    0
  );
  if (totalStones !== 9) {
    return -1;
  }

  // recursive function than moves an extra stone, then backtracks
  // i is the index of an empty cell in the zeros array that we are currently filling
  // count is the current number of moves
  function solve(i, count) {
    // base case, we filled all empty cells in zeros
    // update result
    if (i >= zeros.length) {
      minMoves = Math.min(minMoves, count);
      return;
    }
    // we are going to try to fill the empty cell i from every cell with extra stones
    for (let k = 0; k < extras.length; k++) {
      // if we still have an extra stone in the extras cell
      if (extras[k][2] !== 0) {
        // temporarily reduce the number of extra stones in the cell (since we are moving it to the empty cell i)
        extras[k][2] -= 1;
        // continue by recursion to fill the next empty cell in zeros
        // current count is updated by adding Mahnattan distance between the empty cell we just filled, and the extras cell we moved a stone from
        solve(
          i + 1,
          Math.abs(extras[k][0] - zeros[i][0]) +
            Math.abs(extras[k][1] - zeros[i][1]) +
            count
        );
        // backtrack by adding the extra stone back
        extras[k][2] += 1;
      }
    }
  }
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (grid[x][y] === 0) {
        zeros.push([x, y]);
      } else if (grid[x][y] > 1) {
        extras.push([x, y, grid[x][y] - 1]);
      }
    }
  }

  if (zeros.length === 0) {
    return 0;
  }

  solve(0, 0);
  return minMoves;
};
