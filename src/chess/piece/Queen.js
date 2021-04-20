import Base from './Base';
import Rook from './Rook';
import Bishop from './Bishop';

// 퀸
class Queen extends Base {
  constructor(board, row, col, color) {
    super(board, row, col);
    this.color = color; // true = 흑, false = 백
    this.isMove = false; // 한 번이라도 움직였는가
  }

  toString() {
    return '♛';
  }

  selectable() {
    const rookMovableArr = Rook.prototype.selectable.call(this);
    const bishopMovableArr = Bishop.prototype.selectable.call(this);
    const movableArr = rookMovableArr.concat(bishopMovableArr);
    return movableArr;
  }

  movable() {
    const rookMovableArr = Rook.prototype.movable.call(this);
    const bishopMovableArr = Bishop.prototype.movable.call(this);
    const movableArr = rookMovableArr.concat(bishopMovableArr);
    return movableArr;
  }
}

export default Queen;
