import React, { useState } from 'react';
import styles from './Tictactoe.module.css';
import HomeButton from '../common/HomeButton';
import FnButtons from '../common/FnButtons';
import Board from '../common/Board';
import go from './logic';

const SIZE = 3; // 틱택토판 3x3
const emptyBoard = Array.from(new Array(SIZE), () =>
  new Array(SIZE).fill(null)
);

const Tictactoe = () => {
  const [board, setBoard] = useState(emptyBoard);
  const [turn, setTurn] = useState(false); // true = O, false = X
  const [history, setHistory] = useState([]);

  const handleClick = (row, col) => {
    if (board[row][col] === null) {
      const newBoard = board.map((item) => item.slice());
      newBoard[row][col] = turn;
      const input = {
        row,
        col
      };
      if (go(newBoard, input, turn)) {
        setBoard(newBoard);
        setHistory(history.concat(input));
        setTurn(!turn);
      }
    }
  };

  const cancel = (event) => {
    event.preventDefault();
    if (history.length !== 0) {
      const newHistory = history.slice();
      const historyObj = newHistory.pop();
      const newBoard = board.map((item) => item.slice());
      newBoard[historyObj.row][historyObj.col] = null;
      setBoard(newBoard);
      setHistory(newHistory);
      setTurn(!turn);
    }
  };

  const initialize = () => {
    setBoard(emptyBoard);
    setHistory([]);
    setTurn(false);
  };

  return (
    <div className={styles.game}>
      <HomeButton />
      <FnButtons
        onCancel={cancel}
        onReset={initialize}
        disabled={history.length === 0}
      />
      <Board
        styles={styles}
        board={board}
        onClick={handleClick}
        onContextMenu={cancel}
        blackText="O"
        whiteText="X"
      />
    </div>
  );
};

export default Tictactoe;
