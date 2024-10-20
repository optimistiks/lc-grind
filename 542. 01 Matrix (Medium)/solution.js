/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
  // first iteration, from top left to bottom right
  // calculate min distance of cell i,j as min distance of it's left and top neighbors + 1
  // if left / top is inaccessible, use Infinity
  for (let i = 0; i < mat.length; ++i) {
    for (let j = 0; j < mat[i].length; ++j) {
      if (mat[i][j] === 0) {
        continue;
      }
      mat[i][j] =
        Math.min(mat[i][j - 1] ?? Infinity, mat[i - 1]?.[j] ?? Infinity) + 1;
    }
  }

  // second iteration, from bottom right to top left
  // calculate min distance of cell i,j as min distance of it's right and bottom neighbors + 1
  // but this time only set it as cell value if it's less than the cell value (set on the first iteration)
  for (let i = mat.length - 1; i >= 0; --i) {
    for (let j = mat[i].length - 1; j >= 0; --j) {
      if (mat[i][j] === 0) {
        continue;
      }
      const candidate =
        Math.min(mat[i][j + 1] ?? Infinity, mat[i + 1]?.[j] ?? Infinity) + 1;
      mat[i][j] = Math.min(candidate, mat[i][j]);
    }
  }

  return mat;
};
