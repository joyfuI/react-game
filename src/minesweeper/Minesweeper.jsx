import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Select,
  MenuItem,
  TextField,
  Typography
} from '@material-ui/core';
import styles from './Minesweeper.module.css';
import MenuButtons from '../common/MenuButtons';
import Board from './Board';
import go from './logic';
import { deepClone } from '../common/util';

const DIFFICULTY = {
  beginning: {
    name: '초급',
    rows: 9,
    cols: 9,
    bomb: 10
  },
  intermediate: {
    name: '중급',
    rows: 16,
    cols: 16,
    bomb: 40
  },
  advanced: {
    name: '고급',
    rows: 16,
    cols: 30,
    bomb: 99
  }
};

const emptyBoard = (row, col) =>
  Array.from(new Array(row), () =>
    Array.from(new Array(col), () => ({ open: false, bomb: 0, flag: false }))
  );

const initBoard = ({ row: currentRow, col: currentCol }, row, col, bomb) => {
  const board = emptyBoard(row, col);
  board[currentRow][currentCol].bomb = -1;
  for (let i = 0; i < bomb; i++) {
    // 지뢰 생성
    let randomRow;
    let randomCol;
    do {
      randomRow = Math.floor(Math.random() * row);
      randomCol = Math.floor(Math.random() * col);
    } while (board[randomRow][randomCol].bomb === -1);
    board[randomRow][randomCol].bomb = -1;
  }
  board[currentRow][currentCol].bomb = 0;
  // 주위 지뢰 개수 카운트
  board.forEach((rowArr, i) =>
    rowArr.forEach((item, j) => {
      if (item.bomb !== -1) {
        let count = 0;
        if (board[i - 1]?.[j]?.bomb === -1) {
          count++;
        }
        if (board[i - 1]?.[j + 1]?.bomb === -1) {
          count++;
        }
        if (board[i]?.[j + 1]?.bomb === -1) {
          count++;
        }
        if (board[i + 1]?.[j + 1]?.bomb === -1) {
          count++;
        }
        if (board[i + 1]?.[j]?.bomb === -1) {
          count++;
        }
        if (board[i + 1]?.[j - 1]?.bomb === -1) {
          count++;
        }
        if (board[i]?.[j - 1]?.bomb === -1) {
          count++;
        }
        if (board[i - 1]?.[j - 1]?.bomb === -1) {
          count++;
        }
        item.bomb = count;
      }
    })
  );
  return board;
};

const Minesweeper = ({ onAlert }) => {
  const [board, setBoard] = useState(() =>
    emptyBoard(DIFFICULTY.beginning.rows, DIFFICULTY.beginning.cols)
  );
  // 실시간 값은 input에 저장하고 포커스를 잃었을 때 difficulty에 저장
  const [difficulty, setDifficulty] = useState(DIFFICULTY.beginning);
  const [input, setInput] = useState({
    rows: DIFFICULTY.beginning.rows,
    cols: DIFFICULTY.beginning.cols,
    bomb: DIFFICULTY.beginning.bomb
  });
  const [bombMax, setBombMax] = useState(() =>
    Math.floor(DIFFICULTY.beginning.rows * DIFFICULTY.beginning.cols * 0.9)
  );
  const [start, setStart] = useState(null); // null: 시작 전, setInterval: 게임 중, false: 게임 끝
  const [watch, setWatch] = useState(0); // 경과 시간

  const handleClick = (row, col, recursive = null) => {
    let newBoard = recursive ?? deepClone(board);
    if (start === null && !recursive) {
      // 첫 클릭이면
      newBoard = initBoard(
        { row, col },
        difficulty.rows,
        difficulty.cols,
        difficulty.bomb
      );
      const now = new Date();
      // setInterval 생성
      setStart(
        setInterval(() => {
          setWatch(Math.floor((new Date().getTime() - now.getTime()) / 1000));
        }, 100)
      );
    }
    const select = newBoard[row][col];
    if (start !== false && !select.open && !select.flag) {
      // 열기 전이고 깃발 표시를 하지 않은 곳 클릭
      select.open = true;
      if (select.bomb === 0) {
        // 주위에 지뢰가 없으면
        if (newBoard[row - 1]?.[col]?.open === false) {
          handleClick(row - 1, col, newBoard);
        }
        if (newBoard[row - 1]?.[col + 1]?.open === false) {
          handleClick(row - 1, col + 1, newBoard);
        }
        if (newBoard[row]?.[col + 1]?.open === false) {
          handleClick(row, col + 1, newBoard);
        }
        if (newBoard[row + 1]?.[col + 1]?.open === false) {
          handleClick(row + 1, col + 1, newBoard);
        }
        if (newBoard[row + 1]?.[col]?.open === false) {
          handleClick(row + 1, col, newBoard);
        }
        if (newBoard[row + 1]?.[col - 1]?.open === false) {
          handleClick(row + 1, col - 1, newBoard);
        }
        if (newBoard[row]?.[col - 1]?.open === false) {
          handleClick(row, col - 1, newBoard);
        }
        if (newBoard[row - 1]?.[col - 1]?.open === false) {
          handleClick(row - 1, col - 1, newBoard);
        }
      }
      if (go(newBoard, difficulty.bomb, onAlert)) {
        setStart((interval) => {
          clearInterval(interval);
          return false;
        });
      }
      if (!recursive) {
        setBoard(newBoard);
      }
    }
  };

  const handleRightClick = (row, col) => {
    const newBoard = deepClone(board);
    const select = newBoard[row][col];
    if (start && !select.open) {
      // 열지 않은 곳 클릭
      select.flag = !select.flag;
      setBoard(newBoard);
    }
  };

  const handleDoubleClick = (row, col) => {
    const select = board[row][col];
    if (start && select.open && select.bomb !== 0) {
      // 숫자가 있는 곳 더블클릭
      let count = 0;
      if (board[row - 1]?.[col]?.flag) {
        count++;
      }
      if (board[row - 1]?.[col + 1]?.flag) {
        count++;
      }
      if (board[row]?.[col + 1]?.flag) {
        count++;
      }
      if (board[row + 1]?.[col + 1]?.flag) {
        count++;
      }
      if (board[row + 1]?.[col]?.flag) {
        count++;
      }
      if (board[row + 1]?.[col - 1]?.flag) {
        count++;
      }
      if (board[row]?.[col - 1]?.flag) {
        count++;
      }
      if (board[row - 1]?.[col - 1]?.flag) {
        count++;
      }
      if (count === select.bomb) {
        // 그 칸에 숫자만큼 깃발이 있을 때
        const newBoard = deepClone(board);
        if (newBoard[row - 1]?.[col]?.flag === false) {
          handleClick(row - 1, col, newBoard);
        }
        if (newBoard[row - 1]?.[col + 1]?.flag === false) {
          handleClick(row - 1, col + 1, newBoard);
        }
        if (newBoard[row]?.[col + 1]?.flag === false) {
          handleClick(row, col + 1, newBoard);
        }
        if (newBoard[row + 1]?.[col + 1]?.flag === false) {
          handleClick(row + 1, col + 1, newBoard);
        }
        if (newBoard[row + 1]?.[col]?.flag === false) {
          handleClick(row + 1, col, newBoard);
        }
        if (newBoard[row + 1]?.[col - 1]?.flag === false) {
          handleClick(row + 1, col - 1, newBoard);
        }
        if (newBoard[row]?.[col - 1]?.flag === false) {
          handleClick(row, col - 1, newBoard);
        }
        if (newBoard[row - 1]?.[col - 1]?.flag === false) {
          handleClick(row - 1, col - 1, newBoard);
        }
        setBoard(newBoard);
      }
    }
  };

  const handleChangeSelect = ({ target }) => {
    Object.values(DIFFICULTY).some((value) => {
      if (target.value === value.name) {
        setBombMax(Math.floor(value.rows * value.cols * 0.9));
        setDifficulty(value);
        setBoard(emptyBoard(value.rows, value.cols));
        setInput({
          rows: value.rows,
          cols: value.cols,
          bomb: value.bomb
        });
        return true;
      }
      return false;
    });
  };

  const handleChange = ({ target }) => {
    const newInput = { ...input };
    newInput[target.name] = parseInt(target.value, 10);
    setInput(newInput);
  };

  const handleBlur = ({ target }) => {
    const [min, max, value] = [
      parseInt(target.min, 10),
      parseInt(target.max, 10),
      parseInt(target.value, 10)
    ];
    const newDifficulty = { ...difficulty };
    newDifficulty[target.name] = Math.max(min, Math.min(max, value)) || min;
    const bomb = Math.floor(newDifficulty.rows * newDifficulty.cols * 0.9);
    if (bomb < newDifficulty.bomb) {
      newDifficulty.bomb = bomb;
    }
    newDifficulty.name = '사용자 정의';
    Object.keys(DIFFICULTY).forEach((key) => {
      if (
        newDifficulty.rows === DIFFICULTY[key].rows &&
        newDifficulty.cols === DIFFICULTY[key].cols &&
        newDifficulty.bomb === DIFFICULTY[key].bomb
      ) {
        newDifficulty.name = DIFFICULTY[key].name;
      }
    });
    setBombMax(bomb);
    setDifficulty(newDifficulty);
    setBoard(emptyBoard(newDifficulty.rows, newDifficulty.cols));
    setInput({
      rows: newDifficulty.rows,
      cols: newDifficulty.cols,
      bomb: newDifficulty.bomb
    });
  };

  const initialize = () => {
    setBoard(emptyBoard(difficulty.rows, difficulty.cols));
    setStart((interval) => {
      clearInterval(interval);
      return null;
    });
    setWatch(0);
  };

  const ruleOptions = Object.keys(DIFFICULTY).map((key) => (
    <MenuItem key={key} value={DIFFICULTY[key].name}>
      {DIFFICULTY[key].name}
    </MenuItem>
  ));

  const flag = board.flat().reduce((acc, cur) => acc + (cur.flag ? 1 : 0), 0);

  return (
    <div className={styles.game}>
      <Box>
        <Card
          classes={{
            root: styles.card
          }}
        >
          <CardContent
            classes={{
              root: styles.cardContent
            }}
          >
            <Select
              value={difficulty.name}
              disabled={start !== null}
              autoWidth
              onChange={handleChangeSelect}
            >
              {ruleOptions}
              <MenuItem value="사용자 정의">사용자 정의</MenuItem>
            </Select>
            <div>
              <TextField
                classes={{
                  root: styles.textField
                }}
                name="cols"
                type="number"
                value={input.cols}
                label="가로"
                disabled={start !== null}
                inputProps={{ min: 8, max: 30 }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <TextField
                classes={{
                  root: styles.textField
                }}
                name="rows"
                type="number"
                value={input.rows}
                label="세로"
                disabled={start !== null}
                inputProps={{ min: 8, max: 24 }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <TextField
                classes={{
                  root: styles.textField
                }}
                name="bomb"
                type="number"
                value={input.bomb}
                label="지뢰"
                disabled={start !== null}
                inputProps={{ min: 10, max: bombMax }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </CardContent>
        </Card>
        <MenuButtons
          className={styles.menuButtons}
          onReset={initialize}
          disabled={start === null}
        />
      </Box>
      <Board
        styles={styles}
        board={board}
        onClick={handleClick}
        onRightClick={handleRightClick}
        onDoubleClick={handleDoubleClick}
      />
      <Typography
        classes={{
          root: `${styles.tick} ${start === null ? 'display-none' : ''}`
        }}
        variant="subtitle1"
      >
        진행시간:&nbsp;
        {watch}
        초&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;남은지뢰:&nbsp;
        {difficulty.bomb - flag}개
      </Typography>
    </div>
  );
};

Minesweeper.propTypes = {
  onAlert: PropTypes.func
};

Minesweeper.defaultProps = {
  onAlert: () => {}
};

export default Minesweeper;
