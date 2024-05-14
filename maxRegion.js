function checkWin(board, player) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      return true;
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] === player &&
      board[1][j] === player &&
      board[2][j] === player
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    (board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player) ||
    (board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player)
  ) {
    return true;
  }

  return false;
}

export default checkWin;
