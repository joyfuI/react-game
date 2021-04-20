import Base from './Base';
import { condition, checkCheck } from '../logic';

// 비숍
class Bishop extends Base {
  constructor(board, row, col, color) {
    super(board, row, col);
    this.color = color; // true = 흑, false = 백
    this.isMove = false; // 한 번이라도 움직였는가
  }

  toString() {
    return '♝';
  }

  selectable() {
    const { board, color } = this;
    const movableArr = [];
    let { row, col } = this;
    row--;
    col--;
    while (condition(board, row, col, color)) {
      if (!checkCheck(this, board[row][col])) {
        movableArr.push(board[row][col]);
      }
      if (board[row][col].color === !color) {
        break;
      }
      row--;
      col--;
    }
    ({ row, col } = this);
    row--;
    col++;
    while (condition(board, row, col, color)) {
      if (!checkCheck(this, board[row][col])) {
        movableArr.push(board[row][col]);
      }
      if (board[row][col].color === !color) {
        break;
      }
      row--;
      col++;
    }
    ({ row, col } = this);
    row++;
    col--;
    while (condition(board, row, col, color)) {
      if (!checkCheck(this, board[row][col])) {
        movableArr.push(board[row][col]);
      }
      if (board[row][col].color === !color) {
        break;
      }
      row++;
      col--;
    }
    ({ row, col } = this);
    row++;
    col++;
    while (condition(board, row, col, color)) {
      if (!checkCheck(this, board[row][col])) {
        movableArr.push(board[row][col]);
      }
      if (board[row][col].color === !color) {
        break;
      }
      row++;
      col++;
    }
    return movableArr;
  }

  movable() {
    const { board, color } = this;
    const movableArr = [];
    let { row, col } = this;
    row--;
    col--;
    while (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
      if (board[row][col].color === !color) {
        break;
      }
      row--;
      col--;
    }
    ({ row, col } = this);
    row--;
    col++;
    while (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
      if (board[row][col].color === !color) {
        break;
      }
      row--;
      col++;
    }
    ({ row, col } = this);
    row++;
    col--;
    while (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
      if (board[row][col].color === !color) {
        break;
      }
      row++;
      col--;
    }
    ({ row, col } = this);
    row++;
    col++;
    while (condition(board, row, col, color)) {
      movableArr.push(board[row][col]);
      if (board[row][col].color === !color) {
        break;
      }
      row++;
      col++;
    }
    return movableArr;
  }
}

export default Bishop;
