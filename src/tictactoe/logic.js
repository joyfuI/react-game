const gameOver = (board, input, turn) => {
  let sum = 0;
  for (
    let { row, col } = input;
    board[row]?.[col] !== undefined &&
    board[row][col] !== null &&
    board[row][col] === turn;
    row--
  ) {
    sum++;
  }
  for (
    let { row, col } = input;
    board[row]?.[col] !== undefined &&
    board[row][col] !== null &&
    board[row][col] === turn;
    row++
  ) {
    sum++;
  }
  if (sum === board.length + 1) {
    return true;
  }

  sum = 0;
  for (
    let { row, col } = input;
    board[row]?.[col] !== undefined &&
    board[row][col] !== null &&
    board[row][col] === turn;
    row--, col++
  ) {
    sum++;
  }
  for (
    let { row, col } = input;
    board[row]?.[col] !== undefined &&
    board[row][col] !== null &&
    board[row][col] === turn;
    row++, col--
  ) {
    sum++;
  }
  if (sum === board.length + 1) {
    return true;
  }

  sum = 0;
  for (
    let { row, col } = input;
    board[row]?.[col] !== undefined &&
    board[row][col] !== null &&
    board[row][col] === turn;
    col++
  ) {
    sum++;
  }
  for (
    let { row, col } = input;
    board[row]?.[col] !== undefined &&
    board[row][col] !== null &&
    board[row][col] === turn;
    col--
  ) {
    sum++;
  }
  if (sum === board.length + 1) {
    return true;
  }

  sum = 0;
  for (
    let { row, col } = input;
    board[row]?.[col] !== undefined &&
    board[row][col] !== null &&
    board[row][col] === turn;
    row++, col++
  ) {
    sum++;
  }
  for (
    let { row, col } = input;
    board[row]?.[col] !== undefined &&
    board[row][col] !== null &&
    board[row][col] === turn;
    row--, col--
  ) {
    sum++;
  }
  if (sum === board.length + 1) {
    return true;
  }

  return false;
};

const go = (board, input, turn, onAlert) => {
  if (
    board.find((row) => row.find((item) => item === null) !== undefined) ===
    undefined
  ) {
    onAlert('무승부입니다!!!');
  } else if (gameOver(board, input, turn)) {
    onAlert(`${turn ? 'O' : 'X'}의 승리입니다!!!`);
  }
  return true;
};

export default go;
