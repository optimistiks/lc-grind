/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  /*
    we dont need to iterate subboxes, we just need to determine what subbox does a [row, col] cell belong to
    two ways
    one is to uniquely identify a subbox by a pair of coordinates, [row/3, col/3]
        so for row=2 col=2 it will be [2/3, 2/3] = [0, 0] (first subbox)
    or we can identify it by a single number from 0 to 8
        by doing this (row/3) * 3 + (col/3)
        so for row=2 col=2 it will be (2/3) * 3 + (2/3) = 0*3 + 0 = 0
        for row=5 col=5 it will be (5/3) * 3 + (5/3) = 1 * 3 + 1 = 4 (4th subbox if the first one is 0th)
    so while we iterate the board, 
    for each [row, col]
    check set at rows[row]
    check set at cols[col]
    check set at subbox[box]
    */

  const size = board.length;

  const rows = Array.from({ length: size }, () => new Set());
  const cols = Array.from({ length: size }, () => new Set());
  const boxes = Array.from({ length: size }, () => new Set());

  for (let row = 0; row < board.length; ++row) {
    for (let col = 0; col < board[row].length; ++col) {
      const val = board[row][col];
      if (val === ".") continue;
      const box = Math.floor(row / 3) * 3 + Math.floor(col / 3);
      if (rows[row].has(val) || cols[col].has(val) || boxes[box].has(val)) {
        return false;
      }
      rows[row].add(val);
      cols[col].add(val);
      boxes[box].add(val);
    }
  }

  return true;
};

/*
tc: we iterate the board, so O(N^2)
sc: we essentially duplicate each row and col as a set, plus add sub-boxes, so O(N^2)
*/
