import Base from './Base';
import { condition, checkCheck, checkCastling } from '../logic';

// 킹
class King extends Base {
  constructor(board, row, col, color) {
    super(board, row, col);
    this.color = color; // true = 흑, false = 백
    this.isMove = false; // 한 번이라도 움직였는가
  }

  toString() {
    return '♚';
  }

  selectable() {
    const { board, color, isMove } = this;
    const movableArr = [];
    let { row, col } = this;
    row--;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    col++;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    row++;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    row++;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    col--;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    col--;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    row--;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    row--;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    if (!isMove) {
      // 캐슬링
      const rookRow = color ? 0 : 7;
      if (checkCastling(board[rookRow][0])) {
        movableArr.push(board[rookRow][0]);
      }
      if (checkCastling(board[rookRow][7])) {
        movableArr.push(board[rookRow][7]);
      }
    }
    return movableArr;
  }

  movable() {
    const { board, color } = this;
    const movableArr = [];
    let { row, col } = this;
    row--;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    col++;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    row++;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    row++;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    col--;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    col--;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    row--;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    row--;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    return movableArr;
  }
}

export default King;
