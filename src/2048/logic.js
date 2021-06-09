// 움직일 수 있는지 체크
const checkMove = (board) =>
  board.some((row, i) =>
    row.some(
      (item, j) =>
        !item || item === board[i]?.[j + 1] || item === board[i + 1]?.[j]
    )
  );

const go = (board, onAlert) => {
  let isEmpty = false;
  let is2048 = false;
  board.forEach((row) =>
    row.forEach((item) => {
      if (!item) {
        isEmpty = true;
      } else if (item === 2048) {
        is2048 = true;
      }
    })
  );

  if (isEmpty) {
    // 빈 곳이 있으면 새로운 숫자 배치
    let randomRow;
    let randomCol;
    do {
      randomRow = Math.floor(Math.random() * board.length);
      randomCol = Math.floor(Math.random() * board.length);
    } while (board[randomRow][randomCol]);
    if (Math.floor(Math.random() * 10) > 1) {
      board[randomRow][randomCol] = 2; // 90%
    } else {
      board[randomRow][randomCol] = 4; // 10%
    }
  }
  if (!checkMove(board)) {
    // 움직일 수 없으면
    onAlert('실패!!!');
  } else if (is2048) {
    // 2048을 완성하고도 움직일 수 있으면
    onAlert('클리어!!!');
  }
};

export default go;
