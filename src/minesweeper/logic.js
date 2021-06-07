const go = (board, bomb, onAlert) => {
  let count = 0;
  let gameover = false;
  board.forEach((row) =>
    row.forEach((item) => {
      if (!item.open) {
        // 열지 않은 칸 세기
        count++;
      } else if (item.bomb === -1) {
        // 지뢰를 밟음
        gameover = true;
      }
    })
  );
  if (gameover) {
    // 지뢰를 밟으면 모든 지뢰 위치 표시
    board.forEach((row, i) =>
      row.forEach((item, j) => {
        if (item.bomb === -1) {
          board[i][j].open = true;
        }
      })
    );
    return true;
  }
  if (count === bomb) {
    // 지뢰를 제외한 모든 칸을 열면 모든 지뢰에 깃발 표시
    board.forEach((row, i) =>
      row.forEach((item, j) => {
        if (item.bomb === -1) {
          board[i][j].flag = true;
        }
      })
    );
    onAlert('클리어!!!');
    return true;
  }
  return false;
};

export default go;
