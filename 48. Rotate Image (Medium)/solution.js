/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  // left boundary (also top boundary)
  let l = 0;
  // right boundary (also bottom boundary)
  let r = matrix.length - 1;
  while (l < r) {
    // iterate the amount between boundaries
    for (let i = 0; i < r - l; ++i) {
      const t = l;
      const b = r;
      // swap top left, bottom left, bottom right, top right
      // top left: matrix[t] is top row, and then [l + i] left most cell moving forward
      // bottom left: matrix[b - i] is bottom most row moving upwards, and then [l] left most cell
      // bottom right: matrix[b] is bottom row, and then [r - i] right most cell going backwards
      // top right: matrix[t + i] is top row going downwards, and [r] right most cell

      console.log(
        "swapping",
        `[${t},${l + i}]`,
        `[${b - i},${l}]`,
        `[${b},${r - i}]`,
        `[${t + i},${r}]`
      );
      const topLeft = matrix[t][l + i];
      matrix[t][l + i] = matrix[b - i][l];
      matrix[b - i][l] = matrix[b][r - i];
      matrix[b][r - i] = matrix[t + i][r];
      matrix[t + i][r] = topLeft;
    }
    l += 1;
    r -= 1;
  }
  return matrix;
};
