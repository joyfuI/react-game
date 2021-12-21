import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip } from '@material-ui/core';
import styles from './Connect6.module.css';
import MenuButtons from '../common/MenuButtons';
import Board from '../common/Board';
import go from './logic';

const SIZE = 19; // 바둑판 19x19
const emptyBoard = Array.from(new Array(SIZE), () =>
  new Array(SIZE).fill(null)
);

const Connect6 = ({ onAlert }) => {
  const [board, setBoard] = useState(emptyBoard);
  const [turn, setTurn] = useState(true); // true = 흑, false = 백
  const [history, setHistory] = useState([]);

  const handleClick = (row, col) => {
    if (board[row][col] === null) {
      const newBoard = board.map((item) => item.slice());
      newBoard[row][col] = turn;
      const input = {
        row,
        col,
      };
      if (go(newBoard, input, turn, onAlert)) {
        setBoard(newBoard);
        setHistory(history.concat(input));
        if (history.length === 0 || history.length % 2 === 0) {
          setTurn(!turn);
        }
      }
    }
  };

  const cancel = (e) => {
    e.preventDefault();
    if (history.length !== 0) {
      const newHistory = history.slice();
      const historyObj = newHistory.pop();
      const newBoard = board.map((item) => item.slice());
      newBoard[historyObj.row][historyObj.col] = null;
      setBoard(newBoard);
      setHistory(newHistory);
      if (history.length === 1 || history.length % 2 === 1) {
        setTurn(!turn);
      }
    }
  };

  const initialize = () => {
    setBoard(emptyBoard);
    setHistory([]);
    setTurn(true);
  };

  return (
    <div className={styles.game}>
      <Box>
        <Chip label="흑" color={turn ? 'primary' : 'default'} />
        <MenuButtons
          className={styles.menuButtons}
          onCancel={cancel}
          onReset={initialize}
          disabled={history.length === 0}
        />
        <Chip label="백" color={!turn ? 'primary' : 'default'} />
      </Box>
      <Board
        styles={styles}
        board={board}
        onClick={handleClick}
        onContextMenu={cancel}
      />
    </div>
  );
};

Connect6.propTypes = {
  onAlert: PropTypes.func,
};

Connect6.defaultProps = {
  onAlert: () => {},
};

export default Connect6;
