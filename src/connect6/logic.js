import Count from './Count';

const go = (board, input, turn, onAlert) => {
  let sum = 1;
  // 특정 방향으로 돌 개수 세기
  sum = Math.max(sum, new Count(board, input, turn).arrow(2).arrow(8).getSum()); // 위쪽.아래쪽
  sum = Math.max(sum, new Count(board, input, turn).arrow(4).arrow(6).getSum()); // 왼쪽.오른쪽
  sum = Math.max(sum, new Count(board, input, turn).arrow(1).arrow(9).getSum()); // 왼위쪽.오른아래쪽
  sum = Math.max(sum, new Count(board, input, turn).arrow(3).arrow(7).getSum()); // 오른위쪽.왼아래쪽

  if (sum >= 6) {
    onAlert(`${turn ? '흑' : '백'}의 승리입니다!!!`);
  } else if (
    board.find((row) => row.find((item) => item === null) !== undefined) ===
    undefined
  ) {
    onAlert('무승부입니다!!!');
  }
  return true;
};

export default go;
