import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Baduk.module.css';
import Board from '../common/Board';

const SIZE = 19; // 바둑판 19x19
const emptyBoard = Array.from(new Array(SIZE), () =>
  new Array(SIZE).fill(null)
);

const Baduk = ({ back }) => {
  const [board, setBoard] = useState(emptyBoard);
  const [turn, setTurn] = useState(true);
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
      <div className={styles.buttons}>
        <input type="button" value="처음으로" onClick={back} />
        <br />
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

Baduk.propTypes = {
  back: PropTypes.func
};

Baduk.defaultProps = {
  back: () => {}
};

export default Baduk;
