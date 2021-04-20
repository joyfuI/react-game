import Base from './Base';
import { condition, checkCheck } from '../logic';

// 나이트
class Knight extends Base {
  constructor(board, row, col, color) {
    super(board, row, col);
    this.color = color; // true = 흑, false = 백
    this.isMove = false; // 한 번이라도 움직였는가
  }

  toString() {
    return '♞';
  }

  selectable() {
    const { board, color } = this;
    const movableArr = [];
    let { row, col } = this;
    row -= 2;
    col -= 1;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    col += 2;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    ({ row, col } = this);
    row -= 1;
    col += 2;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    row += 2;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    ({ row, col } = this);
    row += 2;
    col += 1;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    col -= 2;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    ({ row, col } = this);
    row += 1;
    col -= 2;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    row -= 2;
    if (
      condition(board, row, col, color) &&
      !checkCheck(this, board[row][col])
    ) {
      movableArr.push(board[row][col]);
    }
    return movableArr;
  }

  movable() {
    const { board, color } = this;
    const movableArr = [];
    let { row, col } = this;
    row -= 2;
    col -= 1;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    col += 2;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    ({ row, col } = this);
    row -= 1;
    col += 2;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    row += 2;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    ({ row, col } = this);
    row += 2;
    col += 1;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    col -= 2;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    ({ row, col } = this);
    row += 1;
    col -= 2;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    row -= 2;
    if (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
    }
    return movableArr;
  }
}

export default Knight;
