/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let count = 0;

  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  function exploreIsland(r, c) {
    grid[r][c] = "0";

    for (const [dr, dc] of dir) {
      const nr = r + dr;
      const nc = c + dc;
      if (grid[nr] && grid[nr][nc] && grid[nr][nc] === "1") {
        exploreIsland(nr, nc);
      }
    }
  }

  for (let r = 0; r < grid.length; ++r) {
    for (let c = 0; c < grid[r].length; ++c) {
      if (grid[r][c] === "1") {
        exploreIsland(r, c);
        count += 1;
      }
    }
  }

  return count;
};

/*
REACTO
Repeat
given m x n binary grid
    1 means land, 0 means water
return
    number of islands: connected land cells horizontally or vertically

Example

Approach
backtracking, but don't reset visited?

so iterate grid m x n
at each cell that is 1, check if it's not yet visited
if not, start expanding the island, marking nodes as visited
when done, increment counter
*/
