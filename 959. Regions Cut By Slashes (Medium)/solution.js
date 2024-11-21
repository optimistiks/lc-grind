/**
 * @param {string[]} grid
 * @return {number}
 */
var regionsBySlashes = function (grid) {
  // our grid is square, so size = grid.length * grid.length (3*3 = 9)
  // but each grid cell is split into 4 regions
  // which makes size = 6*6 = 36
  // grid 2*2, total items = 4
  // gird 4*4 total items 16
  const parents = Array.from({ length: grid.length * 2 * grid.length * 2 });
  const ranks = [];

  const rows = grid.length;
  const cols = grid.length;

  const find = (v) => {
    if (parents[v] !== v) {
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

  // row major order index
  const getIndex = (i, j, cols) => {
    return i * cols + j;
  };

  // retrieve 4 regions from one cell
  // if we have grid 2x2 we actually have grid 4x4
  // because each cell split into 4
  // so we treat it as:
  // cell 0,0 north is 0,0
  // cell 0,0 south is 1,1
  // cell 0,0 west is 1,0
  // cell 0,0 east is 0,1
  const getNorth = (i, j) => {
    // north region (e.g. 0,0)
    return getIndex(i * 2, j * 2, cols * 2);
  };
  const getEast = (i, j) => {
    // east region (e.g 0,1)
    return getIndex(i * 2, j * 2 + 1, cols * 2);
  };
  const getWest = (i, j) => {
    // west region (e.g 1,0)
    return getIndex(i * 2 + 1, j * 2, cols * 2);
  };
  const getSouth = (i, j) => {
    // south region (e.g. 1,1)
    return getIndex(i * 2 + 1, j * 2 + 1, cols * 2);
  };

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      parents[getNorth(i, j)] = getNorth(i, j);
      parents[getEast(i, j)] = getEast(i, j);
      parents[getWest(i, j)] = getWest(i, j);
      parents[getSouth(i, j)] = getSouth(i, j);
    }
  }

  for (let i = 0; i < rows; ++i) {
    const rowData = grid[i].split("");
    for (let j = 0; j < cols; ++j) {
      const char = rowData[j];
      if (char === "\\") {
        // we need to union north+east and west+south
        union(getNorth(i, j), getEast(i, j));
        union(getWest(i, j), getSouth(i, j));
      }
      if (char === "/") {
        // we need to union north+west and east+south
        union(getNorth(i, j), getWest(i, j));
        union(getEast(i, j), getSouth(i, j));
      }
      if (char === " ") {
        // we need to union all 4
        union(getNorth(i, j), getWest(i, j));
        union(getWest(i, j), getSouth(i, j));
        union(getSouth(i, j), getEast(i, j));
        union(getEast(i, j), getNorth(i, j));
      }
      // connect this cell north with upper cell south
      if (i - 1 >= 0) {
        union(getNorth(i, j), getSouth(i - 1, j));
      }
      // connect this cell south with bottom cell north
      if (i + 1 < grid.length) {
        union(getSouth(i, j), getNorth(i + 1, j));
      }
      // connect this cell east with right cell west
      if (j + 1 < grid.length) {
        union(getEast(i, j), getWest(i, j + 1));
      }
      // connect this cell west with left cell east
      if (j - 1 >= 0) {
        union(getWest(i, j), getEast(i, j - 1));
      }
    }
  }

  let count = 0;
  for (let i = 0; i < parents.length; ++i) {
    if (find(i) === i) {
      count += 1;
    }
  }

  return count;
};
