var solve = function (board) {
  if (!board || !board[0]) {
    return;
  }

  const ROWS = board.length;
  const COLS = board[0].length;

  let borders = Array.from({ length: ROWS }, (v, k) => k)
    .map((v) => [
      [v, 0],
      [v, COLS - 1],
    ])
    .concat(
      Array.from({ length: COLS }, (v, k) => k).map((v) => [
        [0, v],
        [ROWS - 1, v],
      ])
    )
    .flat();

  borders.forEach((pos) => explore(pos[0], pos[1]));

  for (let r = 0; r < ROWS; ++r) {
    for (let c = 0; c < COLS; ++c) {
      if (board[r][c] == "O") board[r][c] = "X";
      if (board[r][c] == "E") board[r][c] = "O";
    }
  }

  function explore(row, col) {
    const dir = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    const queue = new Queue();
    queue.enqueue([row, col]);

    while (queue.size() > 0) {
      const [row, col] = queue.dequeue();

      if (board[row][col] !== "O") continue;

      board[row][col] = "E";

      for (const [dRow, dCol] of dir) {
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (board[newRow] != null && board[newRow][newCol] != null) {
          queue.enqueue([newRow, newCol]);
        }
      }
    }
  }
};

const BFS = function (board, row, col, ROWS, COLS) {
  let queue = [[row, col]];
  while (queue.length) {
    let [row, col] = queue.shift();
    if (board[row][col] !== "O") {
      continue;
    }
    board[row][col] = "E"; // Mark this cell as escaped
    if (col < COLS - 1) queue.push([row, col + 1]);
    if (row < ROWS - 1) queue.push([row + 1, col]);
    if (col > 0) queue.push([row, col - 1]);
    if (row > 0) queue.push([row - 1, col]);
  }
};
