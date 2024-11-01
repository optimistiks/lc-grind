/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var transpose = function (matrix) {
  const transposed = Array.from({ length: matrix[0].length }).map(() =>
    Array.from({ length: matrix.length })
  );
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < matrix[0].length; ++j) {
      transposed[j][i] = matrix[i][j];
    }
  }
  return transposed;
};
