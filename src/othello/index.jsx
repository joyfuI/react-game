import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Othello.module.css';
import Board from '../common/Board';
import CountField from './CountField';
import { count, go, pass } from './logic';

const SIZE = 8; // 오델로판 8x8
const emptyBoard = (() => {
  const board = Array.from(new Array(SIZE), () => new Array(SIZE).fill(null));
  const center = Math.floor(SIZE / 2);
  board[center - 1][center - 1] = false;
  board[center][center] = false;
  board[center - 1][center] = true;
  board[center][center - 1] = true;
  return board;
})();

const Othello = () => {
  const [board, setBoard] = useState(emptyBoard);
  const [turn, setTurn] = useState(true);
  const [history, setHistory] = useState([]);
  const [colorCount, setColorCount] = useState(count(board));

  useEffect(() => {
    setColorCount(count(board));
  }, [board]);

  const handleClick = (row, col) => {
    if (board[row][col] === null) {
      const newBoard = board.map((item) => item.slice());
      const input = {
        row,
        col,
        color: turn
      };
      const changeArr = go(newBoard, input);
      if (changeArr.length !== 0) {
        changeArr.forEach((change) => {
          newBoard[change.row][change.col] = turn;
        });
        setBoard(newBoard);
        const newHistory = history.slice();
        newHistory.push(changeArr);
        setHistory(newHistory);
        setTurn(!turn);
      }
      const passCheck = pass(newBoard, turn);
      if (passCheck !== null) {
        setTurn(passCheck);
      }
    }
  };

  const cancel = (event) => {
    event.preventDefault();
    if (history.length !== 0) {
      const newHistory = history.slice();
      const historyArr = newHistory.pop();
      const newBoard = board.map((item) => item.slice());
      historyArr.forEach((historyObj, index) => {
        if (index === 0) {
          setTurn(historyObj.color);
          newBoard[historyObj.row][historyObj.col] = null;
        } else {
          newBoard[historyObj.row][historyObj.col] = !newBoard[historyObj.row][
            historyObj.col
          ];
        }
      });
      setBoard(newBoard);
      setHistory(newHistory);
    }
  };

  const initialize = () => {
    setBoard(emptyBoard);
    setHistory([]);
    setTurn(true);
  };

  return (
    <div className={styles.game}>
      <div className={styles.buttons}>
        <Link to="/">
          <input type="button" value="처음으로" />
        </Link>
        <br />
        <CountField
          count={colorCount.black}
          highlight={turn}
          className={styles.black}
        />
        <input
          type="button"
          value="무르기"
          onClick={cancel}
          disabled={history.length === 0}
        />
        <input
          type="button"
          value="초기화"
          onClick={initialize}
          disabled={history.length === 0}
        />
        <CountField
          count={colorCount.white}
          highlight={!turn}
          className={styles.white}
        />
      </div>
      <Board
        styles={styles}
        board={board}
        onClick={handleClick}
        onContextMenu={cancel}
      />
    </div>
  );
};

export default Othello;
