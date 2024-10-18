/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (grid, sr, sc, target) {
  // last argument is the original value that was in the source cell
  // (which is the value that an adjacent cell must have for the fill to continue)
  // since its our first call we pass null
  // so this value can be initialized
  floodFillRec(grid, sr, sc, target, null);
  return grid;
};

function floodFillRec(grid, sr, sc, target, prevV) {
  if (grid[sr] == null || grid[sr][sc] == null) {
    // check if we went out of bounds
    return;
  }

  // keep the original source cell value to check all connected cells
  const prev = prevV ?? grid[sr][sc];

  if (grid[sr][sc] !== prev || grid[sr][sc] === target) {
    // either value in the cell is not equal to the initial source cell value,
    // or value is the target already
    // in any case, return
    return;
  }

  // replace value in the grid
  grid[sr][sc] = target;

  // branch out to the 4 connected cells, left / right and top / bottom
  floodFillRec(grid, sr + 1, sc, target, prev);
  floodFillRec(grid, sr - 1, sc, target, prev);
  floodFillRec(grid, sr, sc + 1, target, prev);
  floodFillRec(grid, sr, sc - 1, target, prev);
}
