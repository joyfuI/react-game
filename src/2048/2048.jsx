import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Z048.module.css';
import MenuButtons from '../common/MenuButtons';
import Board from './Board';
import go from './logic';
import { deepClone } from '../common/util';

const SIZE = 4;

const initBoard = () => {
  const board = Array.from(new Array(SIZE), () => new Array(SIZE).fill(null));
  for (let i = 0; i < 2; i++) {
    // 랜덤 생성
    let randomRow;
    let randomCol;
    do {
      randomRow = Math.floor(Math.random() * SIZE);
      randomCol = Math.floor(Math.random() * SIZE);
    } while (board[randomRow][randomCol]);
    board[randomRow][randomCol] = 2;
  }
  return board;
};

const Z048 = ({ onAlert }) => {
  const [board, setBoard] = useState(initBoard);

  const touchStart = useRef({ clientX: null, clientY: null });

  const handleKeyDown = useCallback(
    (e) => {
      if (e.keyCode < 37 || e.keyCode > 40) {
        // 방향키가 아니면 무시
        return;
      }
      e.preventDefault();
      const newBoard = deepClone(board);
      let isMove = false;
      switch (e.key) {
        case 'ArrowUp': // 위
          for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
              if (!newBoard[j][i]) {
                continue;
              }
              for (let k = 0; k < j; k++) {
                if (!newBoard[k][i]) {
                  // 비어 있으면
                  newBoard[k][i] = newBoard[j][i];
                  newBoard[j][i] = null;
                  isMove = true;
                  break;
                } else if (newBoard[k][i] === newBoard[j][i]) {
                  // 같은 숫자면
                  let tmp = true;
                  for (let l = k + 1; l < j; l++) {
                    // 사이에 다른 숫자가 있는지 확인
                    if (newBoard[l][i]) {
                      tmp = false;
                      break;
                    }
                  }
                  if (tmp) {
                    newBoard[k][i] = newBoard[j][i] * 2;
                    newBoard[j][i] = null;
                    isMove = true;
                    break;
                  }
                }
              }
            }
          }
          break;

        case 'ArrowDown': // 아래
          for (let i = 0; i < SIZE; i++) {
            for (let j = SIZE - 1; j >= 0; j--) {
              if (!newBoard[j][i]) {
                continue;
              }
              for (let k = SIZE - 1; k > j; k--) {
                if (!newBoard[k][i]) {
                  // 비어 있으면
                  newBoard[k][i] = newBoard[j][i];
                  newBoard[j][i] = null;
                  isMove = true;
                  break;
                } else if (newBoard[k][i] === newBoard[j][i]) {
                  // 같은 숫자면
                  let tmp = true;
                  for (let l = k - 1; l > j; l--) {
                    // 사이에 다른 숫자가 있는지 확인
                    if (newBoard[l][i]) {
                      tmp = false;
                      break;
                    }
                  }
                  if (tmp) {
                    newBoard[k][i] = newBoard[j][i] * 2;
                    newBoard[j][i] = null;
                    isMove = true;
                    break;
                  }
                }
              }
            }
          }
          break;

        case 'ArrowLeft': // 왼쪽
          for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
              if (!newBoard[i][j]) {
                continue;
              }
              for (let k = 0; k < j; k++) {
                if (!newBoard[i][k]) {
                  // 비어 있으면
                  newBoard[i][k] = newBoard[i][j];
                  newBoard[i][j] = null;
                  isMove = true;
                  break;
                } else if (newBoard[i][k] === newBoard[i][j]) {
                  // 같은 숫자면
                  let tmp = true;
                  for (let l = k + 1; l < j; l++) {
                    // 사이에 다른 숫자가 있는지 확인
                    if (newBoard[i][l]) {
                      tmp = false;
                      break;
                    }
                  }
                  if (tmp) {
                    newBoard[i][k] = newBoard[i][j] * 2;
                    newBoard[i][j] = null;
                    isMove = true;
                    break;
                  }
                }
              }
            }
          }
          break;

        case 'ArrowRight': // 오른쪽
          for (let i = 0; i < SIZE; i++) {
            for (let j = SIZE - 1; j >= 0; j--) {
              if (!newBoard[i][j]) {
                continue;
              }
              for (let k = SIZE - 1; k > j; k--) {
                if (!newBoard[i][k]) {
                  // 비어 있으면
                  newBoard[i][k] = newBoard[i][j];
                  newBoard[i][j] = null;
                  isMove = true;
                  break;
                } else if (newBoard[i][k] === newBoard[i][j]) {
                  // 같은 숫자면
                  let tmp = true;
                  for (let l = k - 1; l > j; l--) {
                    // 사이에 다른 숫자가 있는지 확인
                    if (newBoard[i][l]) {
                      tmp = false;
                      break;
                    }
                  }
                  if (tmp) {
                    newBoard[i][k] = newBoard[i][j] * 2;
                    newBoard[i][j] = null;
                    isMove = true;
                    break;
                  }
                }
              }
            }
          }
          break;

        default:
      }
      if (isMove) {
        // 변화가 없으면 무시
        go(newBoard, onAlert);
        setBoard(newBoard);
      }
    },
    [board, onAlert]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleTouchStart = (e) => {
    e.preventDefault();
    touchStart.current = {
      clientX: e.changedTouches[0].clientX,
      clientY: e.changedTouches[0].clientY
    };
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    const deltaX =
      Math.abs(e.changedTouches[0].clientX - touchStart.current.clientX) > 50
        ? e.changedTouches[0].clientX - touchStart.current.clientX
        : 0;
    const deltaY =
      Math.abs(e.changedTouches[0].clientY - touchStart.current.clientY) > 50
        ? e.changedTouches[0].clientY - touchStart.current.clientY
        : 0;
    if (!!deltaX === !!deltaY) {
      // 움직이지 않았거나 대각선으로 움직이면 패스. XNOR
      return;
    }
    if (deltaX > 0) {
      e.keyCode = 39;
      e.key = 'ArrowRight';
    } else if (deltaX < 0) {
      e.keyCode = 37;
      e.key = 'ArrowLeft';
    } else if (deltaY > 0) {
      e.keyCode = 40;
      e.key = 'ArrowDown';
    } else if (deltaY < 0) {
      e.keyCode = 38;
      e.key = 'ArrowUp';
    }
    handleKeyDown(e);
  };

  const initialize = () => {
    setBoard(initBoard());
  };

  return (
    <div className={styles.game}>
      <MenuButtons onReset={initialize} />
      <Board
        styles={styles}
        board={board}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

Z048.propTypes = {
  onAlert: PropTypes.func
};

Z048.defaultProps = {
  onAlert: () => {}
};

export default Z048;
