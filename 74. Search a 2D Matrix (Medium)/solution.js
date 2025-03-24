/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  let L = 0;
  // if we imagine all rows of the matrix one after another in a single array
  // first element of the matrix will be at index 0
  // the length of such array will be matrix.length * matrix[0].length
  // and the last element index will be matrix.length * matrix[0].length - 1
  let R = rows * cols - 1;

  while (L <= R) {
    const M = L + Math.floor((R - L) / 2);

    // how many full rows of the matrix will fit into  M
    // cols is the length of one row
    const row = Math.floor(M / cols);

    // how many elements are in the current row
    const col = M % cols;

    const val = matrix[row][col];

    if (target < val) {
      R = M - 1;
    } else if (target > val) {
      L = M + 1;
    } else {
      return true;
    }
  }

  return false;
};

/*
tc: O(log(m * n)) since we run a binary search on a "virtual" array containing all elements of the matrix
sc: O(1)
*/

/*

[0,1,2,3(L),4,5(M),6,7(R),8]
L=3
R=7
M=(7+3) / 2 = 5
M=3 + ((7 - 3) / 2) = 3 + (4 / 2) = 3 + 2 = 5

REACTO

Repeat
input: 
    matrix - m x n integer matrix
        each row is sorted, non-decreasing
        first integer of each row is greater than last integer of previous row
        (so not just every row is sorted, all rows are sorted relative to each other)
    target - integer
output:
    boolean - true if target is in matrix, false otherwise
solution must be O(log(m * n))

Example

Approach
binary search on matrix?

how do we position L and R, and how do we find M?
[
    0(0,0) 1(0,1) 2(0,2), 2.5(0,3)
    3(1,0) 4(1,1) 5(1,2), 5.5(1,3)
    6(2,0) 7(2,1) 8(2,2), 8.5(2,3)
    9(3,0) 10(3,1) 11(3,2), 
]

4: coords (1,1) index (4)
is there a way to get index out of coords, and coords out of an index?

coords 1,1 mean this element is at row 1, position 1
    in front of it is 1-0 = 1 full row (2-0 = 2 full rows) (3-0 = 3 full rows)
    plus 1-0 = 1 element
    2-0 = 2 elements

so

row=1
col=1

rowLen = matrix[0].length
fullRowsBefore = row-0 = 1-0 = 1
elements in rows before = fullRowsBefore * rowLen = 1 * 3 = 3
elements in the same row before = col - 0 = 1
elementsInRowsBefore + elementsInSameRowBefore = 4

index= (row * matrix[0].length) + col
matrix[0].length = 3
row=3, col=2
index= (3 * 3) + 2 = 11

L=0
R=(m*n) - 1

floor(11 / matrix.length)
how many full rows fit into 11?
Math.floor(11 / 3)
how many elements are left after full rows?
11 % 3
11 / 3 = 3 (this is the row)
11 % 3 = 2 (this is col)

0,0
index = (0 * 3) + 0 = 0

row = Math.floor(0 / 3) 

so row = Math.floor(index / matrix.length)
   col = index % matrix.length

what if matrix is

[
    0,1,2,3
    4,5,6,7
    8,9,10,11(row=2,col=3)
]

index=2 * 4 + 3 = 8 + 3 = 11

how many full rows will fit into 11
floor(11 / 3) = 3 (false! 3 full rows are 12 elements)
col = 11 % 3 = 2 (row=3, col,2) false

so if given index
1) how many full rows fit into index
if index = 11, and row length is 4, we can fit 2 full rows into 11
11 / 4 = 2 (so row 0 and row 1, our row is row 2)
2) how many elements are in front of the element
11 % 4 = 3 (so our col is 3, with col=0, col=1, col=2 in front of it)
row = Math.floor(index / matrix[0].length)
col = index % matrix[0].length

if given row, col
1) how many full rows are behind this row
if row index = 3, it means 3 full rows (index 0, index 1, index 2)
2) how many elements are behind = full rows * row.length
3) how many elements are behind this element in this row = col (if col = 2, col=0, col=1 are behind) 
index = row * matrix[0].length + col

*/
