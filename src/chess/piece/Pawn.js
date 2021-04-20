import Base from './Base';
import { checkCheck, enpassant } from '../logic';

// 폰
class Pawn extends Base {
  constructor(board, row, col, color) {
    super(board, row, col);
    this.color = color; // true = 흑, false = 백
    this.isMove = false; // 한 번이라도 움직였는가
  }

  toString() {
    return '♟';
  }

  selectable() {
    const { board, color, isMove } = this;
    const movableArr = [];
    let { row, col } = this;
    row += color ? 1 : -1;
    if (board[row]?.[col] !== undefined && board[row][col].toString() === '') {
      if (!checkCheck(this, board[row][col])) {
        movableArr.push(board[row][col]);
      }
      row += color ? 1 : -1;
      if (
        !isMove &&
        board[row]?.[col] !== undefined &&
        board[row][col].toString() === '' &&
        !checkCheck(this, board[row][col])
      ) {
        movableArr.push(board[row][col]);
      }
      row -= color ? 1 : -1;
    }
    col -= 1;
    if (
      board[row]?.[col] !== undefined &&
      board[row][col].color === !color &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    if (
      board[this.row]?.[col] === enpassant.current &&
      !checkCheck(this, board[row][col])
    ) {
      // 앙파상
      movableArr.push(board[row][col]);
    }
    col += 2;
    if (
      board[row]?.[col] !== undefined &&
      board[row][col].color === !color &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    if (
      board[this.row]?.[col] === enpassant.current &&
      !checkCheck(this, board[row][col])
    ) {
      // 앙파상
      movableArr.push(board[row][col]);
    }
    return movableArr;
  }

  movable() {
    const { board, color, isMove } = this;
    const movableArr = [];
    let { row, col } = this;
    row += color ? 1 : -1;
    if (board[row]?.[col] !== undefined && board[row][col].toString() === '') {
      movableArr.push(board[row][col]);
      row += color ? 1 : -1;
      if (
        !isMove &&
        board[row]?.[col] !== undefined &&
        board[row][col].toString() === ''
      ) {
        movableArr.push(board[row][col]);
      }
      row -= color ? 1 : -1;
    }
    col -= 1;
    if (board[row]?.[col] !== undefined && board[row][col].color === !color) {
      movableArr.push(board[row][col]);
    }
    if (board[this.row]?.[col] === enpassant.current) {
      // 앙파상
      movableArr.push(board[row][col]);
    }
    col += 2;
    if (board[row]?.[col] !== undefined && board[row][col].color === !color) {
      movableArr.push(board[row][col]);
    }
    if (board[this.row]?.[col] === enpassant.current) {
      // 앙파상
      movableArr.push(board[row][col]);
    }
    return movableArr;
  }
}

export default Pawn;
