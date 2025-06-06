/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const FRESH = 1;
  const ROTTEN = 2;

  const queue = new Queue();
  let c = 0;

  for (let row = 0; row < grid.length; ++row) {
    for (let col = 0; col < grid[row].length; ++col) {
      if (grid[row][col] === ROTTEN) {
        queue.enqueue([row, col]);
      }
      if (grid[row][col] === FRESH) {
        c += 1;
      }
    }
  }

  if (c === 0) return 0;

  let minutes = -1;
  const dir = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  const bfs = () => {
    while (queue.size() > 0) {
      const size = queue.size();
      for (let i = 0; i < size; ++i) {
        const [row, col] = queue.dequeue();
        dir.forEach(([dRow, dCol]) => {
          const newRow = row + dRow;
          const newCol = col + dCol;
          if (grid[newRow] && grid[newRow][newCol] === FRESH) {
            grid[newRow][newCol] = ROTTEN;
            queue.enqueue([newRow, newCol]);
          }
        });
      }
      minutes += 1;
    }
  };

  bfs();

  for (let row = 0; row < grid.length; ++row) {
    for (let col = 0; col < grid[row].length; ++col) {
      if (grid[row][col] === FRESH) {
        return -1;
      }
    }
  }

  return minutes;
};

/*
REACTO

Repeat
given
    m x n grid
    cell values: 0 (empty), 1(fresh), 2(rotten)
    every minute a fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten
    return minimum number of minutes until all oranges are rotten
    if it's not possible to rot all oranges, return -1

Example
Approach
start bfs from rotten oranges?
enqueue all rotten oranges
mark all adjacent fresh ones as rotten
enqueue them as well
empty queue each time, increment minute counter
*/
