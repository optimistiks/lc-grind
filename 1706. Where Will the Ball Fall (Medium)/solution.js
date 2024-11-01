/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findBall = function (matrix) {
  // number of balls = number of columns = length of the first row since all rows are equal length
  const balls = matrix[0].length;

  // initialize result array, size = number of balls, initial values = initial columns of balls (0 for ball 0, n for ball n)
  const result = Array(balls)
    .fill(null)
    .map((_, i) => i);

  // iterate matrix row, from 0 to last row
  for (let row = 0; row < matrix.length; ++row) {
    // at each row, iterate ball positions
    for (let ball = 0; ball < result.length; ++ball) {
      let col = result[ball];

      // ignore ball if it's stuck
      if (col === -1) {
        continue;
      }

      // take value of the cell the ball is currently in
      const value = matrix[row][col];

      // check if stuck right: value is 1 (go right), but no cell on the right, or cell on the right says go left
      const isStuckRight =
        value === 1 &&
        (matrix[row][col + 1] == null || matrix[row][col + 1] === -1);

      // check if stuck left: value is -1 (go left), but no cell on the left, or cell on the left says go right
      const isStuckLeft =
        value === -1 &&
        (matrix[row][col - 1] == null || matrix[row][col - 1] === 1);

      if (isStuckRight || isStuckLeft) {
        // if stuck, set col to -1, since our result should be col, or -1 if stuck
        col = -1;
      } else {
        // add value to col (either go left 1 col, or right 1 col)
        col += value;
      }

      // update ball position
      result[ball] = col;
    }
  }

  return result;
};
