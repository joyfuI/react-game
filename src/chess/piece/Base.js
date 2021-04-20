class Base {
  constructor(board, row, col) {
    this.board = board; // 보드 정보
    this.row = row;
    this.col = col;
    this.isHighlight = false; // 강조 표시 여부
  }

  // 오버라이딩 필수
  toString() {
    return '';
  }

  // 이동하는 메소드
  move(row, col) {
    const dead = this.board[row][col]; // 잡힌 기물 보관
    this.board[this.row][this.col] = new Base(this.board, this.row, this.col); // 원래 자리를 빈칸으로
    this.row = row;
    this.col = col;
    this.isMove = true;
    this.board[row][col] = this; // 새 자리로 이동
    return dead;
  }

  // 강조 표시할 곳을 반환하는 메소드 (체크여부 고려, 캐슬링 고려)
  // 오버라이딩 필수
  selectable() {
    throw new Error('selectable() 미구현');
  }

  // 이동 가능한 곳을 반환하는 메소드 (체크여부 미고려, 캐슬링 미고려)
  // 오버라이딩 필수
  movable() {
    throw new Error('movable() 미구현');
  }
}

export default Base;
