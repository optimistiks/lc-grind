/**
 * @param {number} row
 * @param {number} col
 * @param {number[][]} cells
 * @return {number}
 */
var latestDayToCross = function (rows, cols, waterCells) {
  // initialize grid
  // +1 because grid indexing starts from 1
  const grid = Array.from({ length: rows + 1 }).map(() =>
    Array.from({ length: cols + 1 })
  );

  // union find
  const parents = [];
  const ranks = [];

  const find = (v) => {
    if (parents[v] !== v) {
      // path compression
      parents[v] = find(parents[v]);
    }
    return parents[v];
  };

  const union = (a, b) => {
    const aParent = find(a);
    const bParent = find(b);
    if (aParent === bParent) {
      return;
    }
    // union by rank
    const aParentRank = ranks[aParent] ?? 0;
    const bParentRank = ranks[bParent] ?? 0;
    if (aParentRank >= bParentRank) {
      parents[bParent] = aParent;
      ranks[aParent] = aParentRank + 1;
      ranks[bParent] = bParentRank;
    } else {
      parents[aParent] = bParent;
      ranks[aParent] = aParentRank;
      ranks[bParent] = bParentRank + 1;
    }
  };

  // convert i,j grid point into index using row major order
  const findIndex = (i, j) => {
    return i * cols + j + 1;
  };

  // initialize union find by setting each cell as it's own parent
  for (let i = 0; i <= rows; ++i) {
    for (let j = 0; j <= cols; ++j) {
      parents[findIndex(i, j)] = findIndex(i, j);
    }
  }

  // left virtual node (occupies index zero which is otherwise unused because of 1-based indexing)
  const leftNode = 0;
  // right virtual node occupies index right after the last grid cell index
  const rightNode = findIndex(rows, cols) + 1;

  // initialize left and right node parents as themselves
  parents[leftNode] = leftNode;
  parents.push(rightNode);

  // offsets to check cardinal and ordinal directions
  const offsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  // days passed (the result)
  let days = 0;

  for (let num = 0; num < waterCells.length; ++num) {
    // for each water cell
    const [i, j] = waterCells[num];
    const index = findIndex(i, j);
    // check water cells in ordinal and cardinal directions
    // union if found
    offsets.forEach(([iOff, jOff]) => {
      if (grid[i + iOff] && grid[i + iOff][j + jOff] === 1) {
        console.log(
          "cells",
          i,
          j,
          "and",
          i + iOff,
          j + jOff,
          "are adjacent waters"
        );
        union(index, findIndex(i + iOff, j + jOff));
      }
    });
    // mark this cell as water
    grid[i][j] = 1;
    // if this cell is in leftmost column, union it with the left virtual node
    if (j === 1) {
      union(index, leftNode);
    }
    // if this cell is in rightmost column, union it with the right virtual node
    if (j === cols) {
      union(index, rightNode);
    }
    // if virtual nodes share a parent, it means there is a line of water nodes from left to right
    // meaning there is no more way to cross
    // so at this point days is our result
    if (find(leftNode) === find(rightNode)) {
      break;
    }
    // increment days passed
    days += 1;
  }

  return days;
};
