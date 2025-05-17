/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const cols = new Set();
  const lDiag = new Set();
  const rDiag = new Set();

  // first build the solutions array as an array of arrays of integers
  // for example [[1,3,0,2]] where numbers indicate queen positions in the corresponding row
  // so in this example queens are at 0,1 1,3 2,0 3,2
  let solutions = [];

  const backtrack = (row, solution) => {
    if (row === n) {
      solutions.push([...solution]);
      return;
    }

    for (let col = 0; col < n; ++col) {
      const diagL = row - col;
      const diagR = row + col;

      if (cols.has(col) || lDiag.has(diagL) || rDiag.has(diagR)) {
        // console.log('not added', 'row', row, 'col', col, 'diag', diagonal);
        continue;
      }

      cols.add(col);

      lDiag.add(diagL);
      rDiag.add(diagR);

      solution.push(col);
      // console.log('added', 'row', row, 'col', col);

      backtrack(row + 1, solution);

      solution.pop();

      cols.delete(col);

      lDiag.delete(diagL);
      rDiag.delete(diagR);
    }
  };

  backtrack(0, []);

  // convert arrays of queen indexes into array of strings - row visualizations
  solutions = solutions.map((solution) =>
    solution.map((queenCol) => {
      let row = "";
      for (let col = 0; col < n; ++col) {
        if (col === queenCol) {
          row += "Q";
        } else {
          row += ".";
        }
      }
      return row;
    })
  );

  return solutions;
};

/*
1,1 2,2 diag 0

2,1 3,2 diag -1
0,3 1,2 2,1 3,0 + = 3

0,2 1,1 2,0 + 2
0,1 1,0 = 1

1,0 2,1 3,2 1-0=1 2-1=1 3,2=1

0,0 1,1 2,2 3,3
*/

/*
REACTO

Repeat
given:
    integer n, indicating n x n chessboard, and n queens placed on a chessboard
output: an array of array of strings
    where each array of strings is a board configuration
        each string is a row where empty cell is "." and queen is Q

Example
n=4
[".Q..", "...Q", "Q...", "..Q."]

Approach
so we should iterate board
and for each cell we should consider placing a queen
and continue search from the next row

0,0 - place queen
1,0 - (check if queen can be placed - NO)
(0,0 1,1 2,2: y-x = 0 diagonal 0)
(0,1 1,2 2,3: y-x = 1 diagonal 1)
(1,0 2,1: 1-2=-1)
1,

*/
