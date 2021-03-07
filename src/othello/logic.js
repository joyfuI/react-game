export const count = (board) => {
  let black = 0;
  let white = 0;
  board.forEach((row) => {
    row.forEach((item) => {
      if (item === true) {
        black++;
      } else if (item === false) {
        white++;
      }
    });
  });
  return {
    black,
    white
  };
};

const reverseLoop = (board, row, col, color, changeRef) => {
  if (board[row]?.[col] === undefined || board[row][col] === null) {
    // 없거나 비어 있으면
    changeRef.splice(0);
    return false;
  }
  if (board[row][col] === color) {
    // 자신의 돌 사이에 상대편 돌이 있으면
    return false;
  }
  // 다른 색일 때
  changeRef.push({
    row,
    col
  });
  return true;
};

const reverse = (board, input) => {
  let change = [input];

  let changeArr = [];
  let { row, col } = input;
  do {
    row--;
  } while (reverseLoop(board, row, col, input.color, changeArr));
  change = change.concat(changeArr);

  changeArr = [];
  row = input.row;
  col = input.col;
  do {
    row--;
    col++;
  } while (reverseLoop(board, row, col, input.color, changeArr));
  change = change.concat(changeArr);

  changeArr = [];
  row = input.row;
  col = input.col;
  do {
    col++;
  } while (reverseLoop(board, row, col, input.color, changeArr));
  change = change.concat(changeArr);

  changeArr = [];
  row = input.row;
  col = input.col;
  do {
    row++;
    col++;
  } while (reverseLoop(board, row, col, input.color, changeArr));
  change = change.concat(changeArr);

  changeArr = [];
  row = input.row;
  col = input.col;
  do {
    row++;
  } while (reverseLoop(board, row, col, input.color, changeArr));
  change = change.concat(changeArr);

  changeArr = [];
  row = input.row;
  col = input.col;
  do {
    row++;
    col--;
  } while (reverseLoop(board, row, col, input.color, changeArr));
  change = change.concat(changeArr);

  changeArr = [];
  row = input.row;
  col = input.col;
  do {
    col--;
  } while (reverseLoop(board, row, col, input.color, changeArr));
  change = change.concat(changeArr);

  changeArr = [];
  row = input.row;
  col = input.col;
  do {
    row--;
    col--;
  } while (reverseLoop(board, row, col, input.color, changeArr));
  change = change.concat(changeArr);

  return change;
};

export const go = (board, input) => {
  const changeArr = reverse(board, input);
  if (changeArr.length === 1) {
    alert('그 곳에 둘 수 없습니다.');
    return [];
  }
  return changeArr;
};

const passCheck = (board, color) => {
  let tmp; // tmp = 0: 돌, 1: 빈곳, 2: 상대
  const size = board.length;
  const re = /(12+0|02+1)/g; // 마법의 정규식
  for (let i = 0; i < size; i++) {
    tmp = '';
    for (let j = 0; j < size; j++) {
      if (board[i][j] === null) {
        tmp += '1';
      } else if (board[i][j] === color) {
        tmp += '0';
      } else {
        tmp += '2';
      }
    }
    if (tmp.search(re) !== -1) {
      return false;
    }
  }
  for (let i = 0; i < size; i++) {
    tmp = '';
    for (let j = 0; j < size; j++) {
      if (board[j][i] === null) {
        tmp += '1';
      } else if (board[j][i] === color) {
        tmp += '0';
      } else {
        tmp += '2';
      }
    }
    if (tmp.search(re) !== -1) {
      return false;
    }
  }
  for (let i = -size + 1; i < size; i++) {
    tmp = '';
    for (let j = 0; j < size; j++) {
      if (i + j < 0 || i + j > size - 1) {
        continue;
      }
      if (board[j][i + j] === null) {
        tmp += '1';
      } else if (board[j][i + j] === color) {
        tmp += '0';
      } else {
        tmp += '2';
      }
    }
    if (tmp.search(re) !== -1) {
      return false;
    }
  }
  for (let i = -size + 1; i < size; i++) {
    tmp = '';
    for (let j = size - 1; j >= 0; j--) {
      if (size - 1 + i - j < 0 || size - 1 + i - j > size - 1) {
        continue;
      }
      if (board[size - 1 + i - j][j] === null) {
        tmp += '1';
      } else if (board[size - 1 + i - j][j] === color) {
        tmp += '0';
      } else {
        tmp += '2';
      }
    }
    if (tmp.search(re) !== -1) {
      return false;
    }
  }
  return true;
};

export const pass = (board, color) => {
  const black = passCheck(board, true);
  const white = passCheck(board, false);
  if (black && white) {
    // 흑백 모두 둘 수 있는 곳이 없으면
    const colorCount = count(board);
    if (colorCount.black === colorCount.white) {
      // 반반씩 먹었을 경우
      alert('무승부입니다!!!');
    } else {
      alert(
        `${colorCount.black > colorCount.white ? '흑' : '백'}의 승리입니다!!!`
      );
    }
  } else if (!color && black) {
    // 흑 패스
    alert('흑이 둘 수 있는 곳이 없습니다.\n백의 차례로 넘어갑니다.');
    return false;
  } else if (color && white) {
    // 백 패스
    alert('백이 둘 수 있는 곳이 없습니다.\n흑의 차례로 넘어갑니다.');
    return true;
  }
  return null;
};
