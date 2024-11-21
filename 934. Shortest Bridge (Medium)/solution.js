/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestBridge = function (grid) {
  // define dimensions (grid of size n by n)
  const n = grid.length;

  // define directions for ease of access of neighbor nodes of a grid cell
  const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  // check if grid node is valid (row and col is between [0 and n) )
  const isValid = (row, col) => row >= 0 && col >= 0 && row < n && col < n;

  // keep visited nodes in a set (we represent nodes as string "row-col")
  // this visit set is special
  // after DFS, it's going to contain only nodes of our first discovered island and no other nodes
  // because our dfs only goes to island nodes
  // which means this set is later can be used to initiate BFS queue to search from each island node
  const visit = new Set();

  // get cell key by joining row and col into a string
  const key = (row, col) => `${row}-${col}`;

  // run dfs recursively that is going to visit only island nodes (value === 1)
  // we use it to discover our first island
  const dfs = (row, col) => {
    if (
      !isValid(row, col) ||
      grid[row][col] === 0 ||
      visit.has(key(row, col))
    ) {
      return;
    }
    visit.add(key(row, col));
    for (const [di, dj] of dir) {
      dfs(row + di, col + dj);
    }
  };

  // run bfs iteratively
  // we run it layer by layer
  // zero layer is when the queue contains the first discovered island
  // then we empty the queue and add every unvisited water neighbor of every cell of the island
  // this will be layer 1
  // as soon as we find an island node that is not visited
  // that is our second island
  // which means we need to stop and return the result
  // which is the number of layers
  // indicating the amount of water cells in between islands that we need to flip
  const bfs = () => {
    let result = 0;

    const queue = Array.from(visit).map((key) =>
      key.split("-").map((val) => parseInt(val))
    );

    while (queue.length > 0) {
      const len = queue.length;
      for (let k = 0; k < len; ++k) {
        const [qRow, qCol] = queue.shift();
        for (const [dRow, dCol] of dir) {
          const row = qRow + dRow;
          const col = qCol + dCol;

          if (!isValid(row, col) || visit.has(key(row, col))) {
            continue;
          }

          if (grid[row][col] === 1) {
            return result;
          }

          queue.push([row, col]);
          visit.add(key(row, col));
        }
      }
      result += 1;
    }

    return result;
  };

  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      if (grid[i][j] === 1) {
        // as soon as we find our first island node,
        // first we run dfs to populate the visit set with cells of the first island
        dfs(i, j);
        // then we run bfs to determine the result and return it
        return bfs();
      }
    }
  }
};
