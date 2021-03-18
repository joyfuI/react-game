import React, { useState } from 'react';
import styles from './Omok.module.css';
import RuleField from './RuleField';
import HomeButton from '../common/HomeButton';
import FnButtons from '../common/FnButtons';
import Board from '../common/Board';
import go from './logic';
import { deepClone, equals } from '../common/util';

const SIZE = 15; // 바둑판 19x19, 오목판 15x15
const RULE = {
  gomoku: {
    name: '고모쿠룰',
    black: {
      double_three: true,
      double_four: true,
      overline: true,
      overline_invalidity: true
    },
    white: {
      double_three: true,
      double_four: true,
      overline: true,
      overline_invalidity: true
    }
  },
  omok: {
    name: '일반룰',
    black: {
      double_three: false,
      double_four: true,
      overline: true,
      overline_invalidity: true
    },
    white: {
      double_three: false,
      double_four: true,
      overline: true,
      overline_invalidity: true
    }
  },
  renju: {
    name: '렌주룰',
    black: {
      double_three: false,
      double_four: false,
      overline: false,
      overline_invalidity: false
    },
    white: {
      double_three: true,
      double_four: true,
      overline: true,
      overline_invalidity: false
    }
  }
};
const emptyBoard = Array.from(new Array(SIZE), () =>
  new Array(SIZE).fill(null)
);

const Omok = () => {
  const [board, setBoard] = useState(emptyBoard);
  const [rule, setRule] = useState(RULE.renju);
  const [turn, setTurn] = useState(true); // true = 검은돌, false = 흰돌
  const [history, setHistory] = useState([]);

  const handleClick = (row, col) => {
    if (board[row][col] === null) {
      const newBoard = board.map((item) => item.slice());
      newBoard[row][col] = turn;
      const input = {
        row,
        col
      };
      if (go(newBoard, rule, input, turn)) {
        setBoard(newBoard);
        setHistory(history.concat(input));
        setTurn(!turn);
      }
    }
  };

  const handleChangeSelect = (event) => {
    Object.values(RULE).some((value) => {
      if (event.target.value === value.name) {
        setRule(value);
        return true;
      }
      return false;
    });
  };

  const handleChangeRule = (event) => {
    const { target } = event;
    const newRule = deepClone(rule);
    const keys = target.value.split('.');
    newRule[keys[0]][keys[1]] =
      keys[1] === 'overline_invalidity' ? target.checked : !target.checked;
    if (keys[1] === 'overline_invalidity' && target.checked) {
      newRule[keys[0]].overline = true;
    } else if (keys[1] === 'overline' && target.checked) {
      newRule[keys[0]].overline_invalidity = false;
    }
    newRule.name = '사용자 정의';
    Object.keys(RULE).forEach((key) => {
      if (
        equals(newRule.black, RULE[key].black) &&
        equals(newRule.white, RULE[key].white)
      ) {
        newRule.name = RULE[key].name;
      }
    });
    setRule(newRule);
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
    setRule(RULE.renju);
  };

  const ruleOptions = Object.keys(RULE).map((key) => (
    <option key={key}>{RULE[key].name}</option>
  ));

  return (
    <div className={styles.game}>
      <HomeButton />
      <div className={styles.buttons}>
        <RuleField
          title="흑"
          color="black"
          onChange={handleChangeRule}
          rule={rule}
          start={history.length !== 0}
        />
        <fieldset>
          <select
            onChange={handleChangeSelect}
            value={rule.name}
            disabled={history.length !== 0}
          >
            {ruleOptions}
            <option>사용자 정의</option>
          </select>
          <FnButtons
            onCancel={cancel}
            onReset={initialize}
            disabled={history.length === 0}
          />
        </fieldset>
        <RuleField
          title="백"
          color="white"
          onChange={handleChangeRule}
          rule={rule}
          start={history.length !== 0}
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

export default Omok;
