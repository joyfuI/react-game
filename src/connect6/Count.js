class Count {
  constructor(board, input, turn) {
    this.board = board;
    this.input = input;
    this.turn = turn;
    this.sum = 1;
  }

  arrow(arrow) {
    let { row, col } = this.input;
    for (;;) {
      switch (arrow) {
        case 1:
          row--;
          col--;
          break;

        case 2:
          row--;
          break;

        case 3:
          row--;
          col++;
          break;

        case 4:
          col--;
          break;

        case 6:
          col++;
          break;

        case 7:
          row++;
          col--;
          break;

        case 8:
          row++;
          break;

        case 9:
          row++;
          col++;
          break;

        default:
      }
      if (this.board[row]?.[col] !== this.turn) {
        break;
      }
      this.sum++;
    }
    return this;
  }

  getSum() {
    return this.sum;
  }
}

export default Count;
