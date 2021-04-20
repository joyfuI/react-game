import Base from './Base';
import { condition, checkCheck, checkCastling } from '../logic';

// 룩
class Rook extends Base {
  constructor(board, row, col, color) {
    super(board, row, col);
    this.color = color; // true = 흑, false = 백
    this.isMove = false; // 한 번이라도 움직였는가
  }

  toString() {
    return '♜';
  }

  selectable() {
    const { board, color, isMove } = this;
    const movableArr = [];
    let { row, col } = this;
    row--;
    while (condition(board, row, col, color)) {
      if (!checkCheck(this, board[row][col])) {
        movableArr.push(board[row][col]);
      }
      if (board[row][col].color === !color) {
        break;
      }
      row--;
    }
    ({ row, col } = this);
    col--;
    while (condition(board, row, col, color)) {
      if (!checkCheck(this, board[row][col])) {
        movableArr.push(board[row][col]);
      }
      if (board[row][col].color === !color) {
        break;
      }
      col--;
    }
    ({ row, col } = this);
    col++;
    while (condition(board, row, col, color)) {
      if (!checkCheck(this, board[row][col])) {
        movableArr.push(board[row][col]);
      }
      if (board[row][col].color === !color) {
        break;
      }
      col++;
    }
    ({ row, col } = this);
    row++;
    while (condition(board, row, col, color)) {
      if (!checkCheck(this, board[row][col])) {
        movableArr.push(board[row][col]);
      }
      if (board[row][col].color === !color) {
        break;
      }
      row++;
    }
    if (!isMove) {
      // 캐슬링
      const rookRow = color ? 0 : 7;
      if (checkCastling(this)) {
        movableArr.push(board[rookRow][4]);
      }
    }
    return movableArr;
  }

  movable() {
    const { board, color } = this;
    const movableArr = [];
    let { row, col } = this;
    row--;
    while (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
      if (board[row][col].color === !color) {
        break;
      }
      row--;
    }
    ({ row, col } = this);
    col--;
    while (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
      if (board[row][col].color === !color) {
        break;
      }
      col--;
    }
    ({ row, col } = this);
    col++;
    while (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
      if (board[row][col].color === !color) {
        break;
      }
      col++;
    }
    ({ row, col } = this);
    row++;
    while (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
      if (board[row][col].color === !color) {
        break;
      }
      row++;
    }
    return movableArr;
  }
}

export default Rook;
