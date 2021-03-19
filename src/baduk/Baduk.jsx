import React, { useState } from 'react';
import styles from './Baduk.module.css';
import HomeButton from '../common/HomeButton';
import MenuButtons from '../common/MenuButtons';
import Board from '../common/Board';

const SIZE = 19; // 바둑판 19x19
const emptyBoard = Array.from(new Array(SIZE), () =>
  new Array(SIZE).fill(null)
);

const Baduk = () => {
  const [board, setBoard] = useState(emptyBoard);
  const [turn, setTurn] = useState(true); // true = 흑, false = 백
  const [history, setHistory] = useState([]);

  const handleClick = (row, col) => {
    if (board[row][col] === null) {
      const newBoard = board.map((item) => item.slice());
      newBoard[row][col] = turn;
      setBoard(newBoard);
      setHistory(
        history.concat({
          row,
          col
        })
      );
      setTurn(!turn);
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
    setTurn(true);
  };

  return (
    <div className={styles.game}>
      <HomeButton />
      <MenuButtons
        onCancel={cancel}
        onReset={initialize}
        disabled={history.length === 0}
      />
      <Board
        styles={styles}
        board={board}
        onClick={handleClick}
        onContextMenu={cancel}
      />
    </div>
  );
};

export default Baduk;
