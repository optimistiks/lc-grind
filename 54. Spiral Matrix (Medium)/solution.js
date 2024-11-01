/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const result = [];

  // initialize direction variable (1 or -1)
  let dir = 1;
  // current row
  let row = 0;
  // current column (we have to start "outside" since we don't want to go out of bounds)
  // current row starts at 0 and not -1 because our first step is to move right, and it's changing columns
  // after moving right our first row is complete, so row=0 is actually "outside", just as col=-1 is.
  let col = -1;

  let rows = matrix.length;
  let cols = matrix[0].length;

  while (rows > 0 && cols > 0) {
    for (let i = 0; i < cols; ++i) {
      col += dir;
      result.push(matrix[row][col]);
    }
    rows -= 1;

    for (let i = 0; i < rows; ++i) {
      row += dir;
      result.push(matrix[row][col]);
    }
    cols -= 1;

    dir *= -1;
  }

  return result;
};
