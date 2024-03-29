/* 군대에서 짠 코드 재탕
 * 거짓금수 관련 문제가 있어서 처음부터 다시 짜려고 했는데 며칠간 고민해도 답이 안나오고 새로짠 코드가 더 문제가 많아서 그냥 재활용
 * 이게 왜 되지...? */
const go = (board, rule, input, turn, onAlert) => {
  let tmp;
  let flag = 0; // 이진수, 1: 승리, 10: 장목, '1'100: 쌍삼, '1'10000: 쌍사

  function count(num) {
    // 특정 방향의 돌 개수를 세는 함수
    let strict = this?.toString() ?? 1;
    let loose = this?.loose ?? 1;
    let wall = this?.wall ?? 0;
    let beyond = this?.beyond ?? 0;
    let tmp2 = 0;
    let i = input.row;
    let j = input.col;
    for (;;) {
      switch (num) {
        case 1:
          i--;
          j--;
          break;

        case 2:
          i--;
          break;

        case 3:
          i--;
          j++;
          break;

        case 4:
          j--;
          break;

        case 6:
          j++;
          break;

        case 7:
          i++;
          j--;
          break;

        case 8:
          i++;
          break;

        case 9:
          i++;
          j++;
          break;

        default:
      }
      if (tmp2 > 0) {
        if (board[i]?.[j] === undefined) {
          // 없으면
          if (tmp2 === 2) {
            wall++;
          } else {
            beyond |= (beyond & 1) === 0 ? 1 : 2;
          }
          break;
        } else if (board[i][j] === null) {
          // 비어 있으면
          break;
        } else if (board[i][j] !== turn) {
          // 다른 색이면
          if (tmp2 === 2) {
            wall++;
          } else {
            beyond |= (beyond & 1) === 0 ? 1 : 2;
          }
          break;
        } else if (tmp2 === 1) {
          tmp2 = 2;
          beyond |= (beyond & 4) === 0 ? 4 : 8;
        }
        loose++; // 같은 색일 때
        continue;
      } else if (board[i]?.[j] === undefined) {
        // 없으면
        wall++;
        break;
      } else if (board[i][j] === null) {
        // 비어 있으면
        tmp2 = 1;
        continue;
      } else if (board[i][j] !== turn) {
        // 다른 색이면
        wall++;
        break;
      }
      strict++; // 같은 색일 때
      loose++;
    }
    return {
      count, // 체이닝
      loose, // 한 칸 건너띈 것도 셌을 때
      wall, // 닫혔는지 여부
      beyond, // 한 칸 건너띄었는지 그리고 건너띈 곳에 다른 색이 있는지. 이진수
      toString() {
        // 돌의 개수
        return strict;
      },
    };
  }

  function check() {
    const myRule = rule[turn ? 'black' : 'white'];
    if (
      !myRule.double_three &&
      tmp.loose === 3 &&
      tmp.wall === 0 &&
      (tmp.beyond & 10) === 0
    ) {
      // 3-3 금지
      flag |= (flag & 4) === 0 ? 4 : 8;
    } else if (
      !myRule.double_four &&
      tmp.loose === 4 &&
      ((tmp === 4 && tmp.wall !== 2) || tmp !== 4) &&
      (tmp.beyond & 8) === 0
    ) {
      // 4-4 금지
      flag |= (flag & 16) === 0 ? 16 : 32;
    } else if (
      !myRule.double_four &&
      tmp + tmp.loose === 8 &&
      (tmp.beyond & 8) !== 0
    ) {
      // 생소한 모양의 4-4
      flag |= 48;
    } else if (myRule.overline_invalidity && tmp > 5) {
      // 장목 무효
    } else if (!myRule.overline && tmp > 5) {
      // 장목 금지
      flag |= 2;
    } else if (tmp >= 5) {
      // 승리
      flag |= 1;
    }
  }

  tmp = count(2).count(8); // 위쪽.아래쪽
  check();
  tmp = count(4).count(6); // 왼쪽.오른쪽
  check();
  tmp = count(1).count(9); // 왼위쪽.오른아래쪽
  check();
  tmp = count(3).count(7); // 오른위쪽.왼아래쪽
  check();
  if ((flag & 1) !== 0) {
    onAlert(`${turn ? '흑' : '백'}의 승리입니다!!!`);
  } else if ((flag & 8) !== 0) {
    onAlert('3-3입니다.');
    return false;
  } else if ((flag & 32) !== 0) {
    onAlert('4-4입니다.');
    return false;
  } else if ((flag & 2) !== 0) {
    onAlert('장목입니다.');
    return false;
  } else if (
    board.find((row) => row.find((item) => item === null) !== undefined) ===
    undefined
  ) {
    onAlert('무승부입니다!!!');
  }
  return true;
};

export default go;
