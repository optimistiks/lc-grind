/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const backtrack = (m, n, i) => {
    if (i === word.length) return true;

    const char = word[i];

    if (!board[m] || !board[m][n] || board[m][n] !== char) return false;

    board[m][n] = null;

    const results = [
      backtrack(m - 1, n, i + 1),
      backtrack(m + 1, n, i + 1),
      backtrack(m, n - 1, i + 1),
      backtrack(m, n + 1, i + 1),
    ];

    board[m][n] = char;

    return results.some((result) => !!result);
  };

  for (let m = 0; m < board.length; ++m) {
    for (let n = 0; n < board[m].length; ++n) {
      if (backtrack(m, n, 0)) {
        return true;
      }
    }
  }

  return false;
};

/*
REACTO

Repeat
given m x n board
string word
return true if word exists in the grid
word exists if it can be constructed from sequentially adjacend letters (vert / horiz)
letter cell may not be reused

Approach
find all occurrences of the first letter
for each occurrence
    recursively search for word
    search(m, n, i, "")
        if (i out of bounds) return true
        const char = word[i]
        if (board[m][n] !== char) return false;
        board[m][n] = null // mark visited
        recurse(m-1, n, i+1, )


*/
