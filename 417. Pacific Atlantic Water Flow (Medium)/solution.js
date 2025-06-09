/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  const result = Array.from({ length: heights.length }, () =>
    Array.from({ length: heights.length })
  );

  for (let row = 0; row < heights.length; ++row) {
    // col 0 - Pacific
    dfs(row, 0, "pacific");
    // last col - Atlantic
    dfs(row, heights[0].length - 1, "atlantic");
  }

  for (let col = 0; col < heights[0].length; ++col) {
    // row 0 - Pacific
    dfs(0, col, "pacific");
    // last row - Atlantic
    dfs(heights.length - 1, col, "atlantic");
  }

  function dfs(row, col, ocean) {
    // ensure result set
    if (result[row][col] == null) result[row][col] = new Set();
    // return if visited
    if (result[row][col].has(ocean)) return;

    result[row][col].add(ocean);

    const dir = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    dir.forEach(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
      if (
        heights[newRow] == null ||
        heights[newRow][newCol] == null ||
        heights[newRow][newCol] < heights[row][col]
      ) {
        return;
      }
      dfs(newRow, newCol, ocean);
    });
  }

  const resultList = [];

  for (let row = 0; row < result.length; ++row) {
    for (let col = 0; col < result[row].length; ++col) {
      if (result[row][col] == null) continue;
      if (result[row][col].has("pacific") && result[row][col].has("atlantic")) {
        resultList.push([row, col]);
      }
    }
  }

  return resultList;
};

/*
REACTO

Repeat
m x n grid
left and top edge - Pacific
right and bottom edge - Atlantic

m x n heights, where heights[r][c] is height at grid[r][c]

water can flow in 4 directions from each cell, if neighboring cell is less or equal height

return list of tuples, where each tuple [ri, ci] is a cell from which the water can reach both oceans

Example

Approach
grid 4 x 4
lets say we start at [0, 0]
row 0 means the cell borders Pacific
col 0 means the cell borders Pacific
row 3 means the cell borders Atlantic
col 3 means the cell borders atlantic
mark 0,0 as pacific
now we look at the neighboring cells
and check those of equal heights or higher
because water flows down, but we go up the flow
continue going up and marking
at some point we will reach the highest point that doesn't have any higher neighbors
so we will have to start at the next ocean-bordering cell (lets say a different ocean)
while going up, we may encounter a cell that was already marked
if it's marked with the current ocean, skip
otherwise add the current ocean
so a cell may have at most two markings, one per each ocean
then we iterate the grid once again, and grab the cell that marked with 2 oceans

*/
