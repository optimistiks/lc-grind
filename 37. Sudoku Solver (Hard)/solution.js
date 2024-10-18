let DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  const sets = createSets();
  const emptyCells = [];
  // iterate board, add empty cells to the list of empty cells,
  // add values of nonempty cells to row, col and subbox sets,
  // so we can later check if value present in a row / col / subbox
  // by checking the corresponding set
  for (let row = 0; row < board.length; ++row) {
    for (let col = 0; col < board.length; ++col) {
      const value = board[row][col];
      if (value === ".") {
        emptyCells.push([row, col]);
      } else {
        getSets(sets, row, col).forEach((valueSet) => {
          valueSet.add(value);
        });
      }
    }
  }
  solveRec(board, emptyCells, sets);
  return board;
};

function solveRec(board, emptyCells, sets) {
  if (emptyCells.length === 0) {
    // base case: no empty cells left, the puzzle is solved
    return;
  }
  for (let i = 0; i < DIGITS.length; ++i) {
    const digit = DIGITS[i];
    // consider last empty cell from the list
    const [row, col] = emptyCells[emptyCells.length - 1];
    // we can place the digit if it's not present in any of the sets (row / col / subbox)
    const canPlace = !getSets(sets, row, col).some((valueSet) =>
      valueSet.has(digit)
    );

    if (canPlace) {
      // if digit can be placed in that cell,
      // pop empty cell from the empty cell list
      const empty = emptyCells.pop();
      // place digit onto the board
      board[row][col] = digit;
      // add digit to the row / col / subbox sets
      getSets(sets, row, col).forEach((valueSet) => valueSet.add(digit));
      // continue recursion with placed digit
      solveRec(board, emptyCells, sets);
      if (emptyCells.length > 0) {
        // if there are still empty cells left, it means that recursion branch did find the solution
        // so backtrack by emptying the cell and putting back empty cell into the empty cell list
        emptyCells.push(empty);
        board[row][col] = ".";
        // remove digit from the corresponding sets
        getSets(sets, row, col).forEach((valueSet) => valueSet.delete(digit));
      } else {
        // if there are no empty cells, the puzzle is solved, no point continuing
        break;
      }
    }
  }
}

function createSets() {
  // create sets that we will use to check if value is present in row X, column Y, or subbox XY
  const rowMap = Array(9)
    .fill()
    .map(() => new Set());
  const colMap = Array(9)
    .fill()
    .map(() => new Set());
  const subboxMap = Array(3)
    .fill()
    .map(() =>
      Array(3)
        .fill()
        .map(() => new Set())
    );
  return { rowMap, colMap, subboxMap };
}

function getSets({ rowMap, colMap, subboxMap }, row, col) {
  // given a row and a col (a position on the board)
  // get the 3 sets related to that position
  // 1) set that contains values in row
  // 2) set that contains values in col
  // 3) set that contains values of a subbox row col belongs to
  // find subbox by int dividing row by the length of the subbox row and col
  // since our board is 9x9, we have 3 subboxes in each row, and 3 subboxes in each col
  return [
    rowMap[row],
    colMap[col],
    subboxMap[Math.floor(row / 3)][Math.floor(col / 3)],
  ];
}

/*
The time complexity of the solveSudoku function is difficult to determine precisely without knowing the size of the Sudoku board. However, we can analyze the time complexity in terms of the number of empty cells in the board.
The solveSudoku function calls the solveRec function, passing in the board and the result of the getEmptyCells function. The getEmptyCells function iterates over the entire board, which has a time complexity of O(n^2), where n is the size of the board.
The solveRec function is a recursive function that solves the Sudoku puzzle. It has a base case when there are no empty cells left, which has a constant time complexity of O(1). In the worst case, the function will iterate through all possible digits for each empty cell. Since there can be at most n^2 empty cells in the board, the worst-case time complexity of the solveRec function is O(9^n^2).
In addition to the time complexity of the solveSudoku function, we also need to consider the time complexity of the canPlace function. The canPlace function iterates over the subbox, rows, and columns of the board, which has a time complexity of O(n). Therefore, the time complexity of the canPlace function is O(n).
Overall, the time complexity of the solveSudoku function is O(9^n^2), where n is the size of the board. The time complexity of the getEmptyCells function is O(n^2), and the time complexity of the canPlace function is O(n).
*/

/*
The space complexity of the solveSudoku function is determined by the space used by the recursive call stack and the emptyCells array.
The recursive call stack will have a maximum depth of n^2, where n is the size of the board. This is because in the worst case, each empty cell will be processed separately, resulting in n^2 recursive calls. Therefore, the space complexity of the recursive call stack is O(n^2).
The emptyCells array stores the coordinates of the empty cells in the board. The maximum size of this array will be n^2, as there can be at most n^2 empty cells in the board. Therefore, the space complexity of the emptyCells array is O(n^2).
In addition to the space used by the solveSudoku function, we also need to consider the space complexity of the built-in JavaScript functions invoked by the code. However, since the code does not use any additional built-in functions that require significant space, the space complexity of the built-in JavaScript functions is negligible.
*/
