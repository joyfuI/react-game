import * as Piece from './piece';

// 비어 있거나 상대 기물이 있는지 확인하는 메소드
export const condition = (board, row, col, color) =>
  board[row]?.[col] !== undefined &&
  (board[row][col].toString() === '' || board[row][col].color === !color);

// 모든 기물이 이동 가능한 곳을 반환하는 메소드 (체크여부 미고려, 캐슬링 미고려)
const movableAll = (board, turn) => {
  const movableArr = [];
  board.forEach((row) =>
    row.forEach((item) => {
      if (item.toString() !== '' && item.color === turn) {
        movableArr.push(...item.movable());
      }
    })
  );
  return movableArr;
};

// 기물 이동 후 체크인지 확인하는 함수. 두 번째 매개변수가 비어있으면 기물을 이동하지 않음
export const checkCheck = (from, to) => {
  const { board, row, col, color, isMove } = from;
  let dead;
  if (to !== undefined) {
    // 임시로 기물 이동
    dead = from.move(to.row, to.col);
  }
  // 상대가 움직일 수 있는 경로 확인
  const yourMovable = movableAll(board, !color);
  // 상대가 움직일 수 있는 경로에 킹이 있는지 확인
  const result = yourMovable.some(
    (item) => item instanceof Piece.King && item.color === color
  );
  if (to !== undefined) {
    // 임시로 이동한 기물 되돌림
    from.move(row, col);
    from.isMove = isMove;
    board[dead.row][dead.col] = dead;
  }
  return result;
};

// 캐슬링 가능한지 체크하는 함수
export const checkCastling = (rook) => {
  const { board, row, col, color } = rook;
  const king = board[row][4];
  if (!(rook instanceof Piece.Rook && king instanceof Piece.King)) {
    // 룩, 킹이 아니면
    return false;
  }
  if (rook.isMove || king.isMove) {
    // 룩이나 킹을 한번이라도 움직였다면
    return false;
  }
  for (let i = col < 4 ? 1 : 5; i <= (col < 4 ? 3 : 6); i++) {
    if (board[row][i].toString() !== '') {
      // 킹과 룩 사이에 말이 있으면
      return false;
    }
  }
  // 상대가 움직일 수 있는 경로 확인
  const yourMovable = movableAll(board, !color);
  // 킹이 통과하는 경로로 상대가 움직일 수 있는지 확인
  const result = yourMovable.some(
    (item) =>
      item.row === row &&
      (col < 4
        ? item.col >= 2 && item.col <= 4
        : item.col >= 4 && item.col <= 6)
  );
  return !result;
};

export const enpassant = { current: null };

export const lastMove = { current: 0 };

export const go = (piece, onAlert) => {
  const { board, color } = piece;

  const flag = {
    yourMovable: false,
    myBishop: 0,
    myKnight: 0,
    myOther: 0,
    yourBishop: 0,
    yourKnight: 0,
    yourOther: 0,
  };
  board.forEach((row) =>
    row.forEach((item) => {
      if (item.toString() !== '') {
        if (item.color === color) {
          // 내 기물
          if (item instanceof Piece.Bishop) {
            flag.myBishop++;
          } else if (item instanceof Piece.Knight) {
            flag.myKnight++;
          } else {
            flag.myOther++;
          }
        } else {
          // 상대 기물
          if (item.selectable().length !== 0) {
            // 움직일 수 있으면
            flag.yourMovable = true;
          }
          if (item instanceof Piece.Bishop) {
            flag.yourBishop++;
          } else if (item instanceof Piece.Knight) {
            flag.yourKnight++;
          } else {
            flag.yourOther++;
          }
        }
      }
    })
  );

  if (!flag.yourMovable) {
    // 상대방이 움직일 수 없고
    if (checkCheck({ board, color: !color })) {
      // 상대방이 체크 상태이면
      onAlert(`체크메이트로 ${color ? '흑' : '백'}의 승리입니다!!!`);
    } else {
      onAlert('스테일메이트로 무승부입니다!!!');
    }
  } else if (
    flag.myOther === 1 &&
    flag.yourOther === 1 &&
    flag.myBishop + flag.myKnight <= 1 &&
    flag.yourBishop + flag.yourKnight <= 1
  ) {
    // 기물이 부족하면
    onAlert('기물 부족으로 무승부입니다!!!');
  } else if (lastMove.current >= 75) {
    onAlert('75수 룰의 의해 무승부입니다!!!');
  }
};
