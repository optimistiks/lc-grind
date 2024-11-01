/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (mat) {
  let frow = false;
  let fcol = false;

  const rows = mat.length;
  const cols = mat[0].length;

  // if any element in the first row or in the first column is 0, set frow / fcol to true

  for (let col = 0; col < cols; ++col) {
    if (mat[0][col] === 0) {
      frow = true;
    }
  }

  for (let row = 0; row < rows; ++row) {
    if (mat[row][0] === 0) {
      fcol = true;
    }
  }

  // scan the complete matrix row-wise by ignoring the first column and the first row,
  // and set 0 in the first element of the particular row and col where 0 is found

  for (let row = 1; row < rows; ++row) {
    for (let col = 1; col < cols; ++col) {
      if (mat[row][col] === 0) {
        mat[row][0] = 0;
        mat[0][col] = 0;
      }
    }
  }

  // check every row's first element, starting from second row
  // if it's 0, set all elements in that row to 0

  for (let row = 1; row < rows; ++row) {
    if (mat[row][0] === 0) {
      for (let col = 0; col < cols; ++col) {
        mat[row][col] = 0;
      }
    }
  }

  // check every column's first element, starting from second column
  // if it's 0, set all elements in that column to 0
  for (let col = 1; col < cols; ++col) {
    if (mat[0][col] === 0) {
      for (let row = 0; row < rows; ++row) {
        mat[row][col] = 0;
      }
    }
  }

  // set the first row and/or column to 0 if frow/fcol is true

  if (frow) {
    for (let col = 0; col < cols; ++col) {
      mat[0][col] = 0;
    }
  }

  if (fcol) {
    for (let row = 0; row < rows; ++row) {
      mat[row][0] = 0;
    }
  }

  return mat;
};
