/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  let max = 0;

  function explore(row, col) {
    let count = 1;

    const queue = new Queue([[row, col]]);
    grid[row][col] = 0;

    while (queue.size() > 0) {
      // remember the size to fully empty the queue before proceeding with the next iteration
      const curSize = queue.size();

      for (let i = 0; i < curSize; ++i) {
        const [row, col] = queue.dequeue();

        const dir = [
          [-1, 0],
          [1, 0],
          [0, 1],
          [0, -1],
        ];

        dir.forEach(([dRow, dCol]) => {
          const newRow = row + dRow;
          const newCol = col + dCol;

          if (grid[newRow] != null && grid[newRow][newCol] === 1) {
            queue.enqueue([newRow, newCol]);

            grid[newRow][newCol] = 0;
            count += 1;
          }
        });
      }
    }

    return count;
  }

  for (let row = 0; row < grid.length; ++row) {
    for (let col = 0; col < grid[row].length; ++col) {
      if (grid[row][col] === 1) {
        const size = explore(row, col);
        max = Math.max(max, size);
      }
    }
  }

  return max;
};

/*
REACTO

Repeat
given m x n matrix with 1 and 0
1 represents land
0 represends water
land is connected horizontally and vertically (not diagonally)
area of an island: number of connected land cells
return maximum area

Example

Approach
bfs
count cells
mark visited

[1,1,0,0,0]
[1,1,0,0,0]
[0,0,0,1,1]
[0,0,0,1,1]

*/
