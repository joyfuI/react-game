import React, { useState } from 'react';
import styles from './Chess.module.css';
import HomeButton from '../common/HomeButton';
import MenuButtons from '../common/MenuButtons';
import Board from './Board';
import * as Piece from './piece';
import { go, enpassant, lastMove } from './logic';

const SIZE = 8; // 체스판 8x8

const initBoard = () => {
  const board = Array.from(new Array(SIZE), () => new Array(SIZE).fill(null));
  board[7][4] = new Piece.King(board, 7, 4, false);
  board[7][3] = new Piece.Queen(board, 7, 3, false);
  board[7][0] = new Piece.Rook(board, 7, 0, false);
  board[7][7] = new Piece.Rook(board, 7, 7, false);
  board[7][2] = new Piece.Bishop(board, 7, 2, false);
  board[7][5] = new Piece.Bishop(board, 7, 5, false);
  board[7][1] = new Piece.Knight(board, 7, 1, false);
  board[7][6] = new Piece.Knight(board, 7, 6, false);
  for (let i = 0; i < SIZE; i++) {
    board[6][i] = new Piece.Pawn(board, 6, i, false);
  }
  board[0][4] = new Piece.King(board, 0, 4, true);
  board[0][3] = new Piece.Queen(board, 0, 3, true);
  board[0][0] = new Piece.Rook(board, 0, 0, true);
  board[0][7] = new Piece.Rook(board, 0, 7, true);
  board[0][2] = new Piece.Bishop(board, 0, 2, true);
  board[0][5] = new Piece.Bishop(board, 0, 5, true);
  board[0][1] = new Piece.Knight(board, 0, 1, true);
  board[0][6] = new Piece.Knight(board, 0, 6, true);
  for (let i = 0; i < SIZE; i++) {
    board[1][i] = new Piece.Pawn(board, 1, i, true);
  }
  board.forEach((row, i) =>
    row.forEach((piece, j) => {
      if (piece === null) {
        board[i][j] = new Piece.Base(board, i, j);
      }
    })
  );
  return board;
};

const Chess = () => {
  const [board, setBoard] = useState(initBoard());
  const [turn, setTurn] = useState(false); // true = 흑, false = 백
  const [history, setHistory] = useState([]);
  const [select, setSelect] = useState(null);

  const initSelect = () => {
    setSelect(null);
    board.forEach((row) =>
      row.forEach((item) => {
        item.isHighlight = false;
      })
    );
  };

  const handleClick = (row, col) => {
    const piece = board[row][col];
    if (piece.isHighlight) {
      // 색칠된 곳을 클릭했을 때
      initSelect(); // 색칠된 거 초기화
      const step = {
        piece: select,
        from: { row: select.row, col: select.col },
        dead: null,
        etc: null
      };
      if (!select.isMove) {
        // 처음 움직일 때
        step.etc = 'firstMove';
        if (select instanceof Piece.Pawn && Math.abs(select.row - row) === 2) {
          // 그게 폰이고 두 칸 움직였다면
          enpassant.current = select; // 앙파상 저장
        }
      }
      if (piece.toString() !== '') {
        // 기물이 있는 곳 클릭
        if (piece.color !== turn) {
          // 상대 기물을 잡았다면
          step.dead = piece; // 잡힌 기물 저장
        } else {
          // 캐슬링
          [step.from, step.piece] =
            piece instanceof Piece.King ? [piece, select] : [select, piece];
          step.etc = 'castling';
        }
        enpassant.current = null; // 앙파상 권리 잃음
        lastMove.current = 0;
      } else if (enpassant.current !== null && enpassant.current !== select) {
        // 앙파상 권리가 있을 때
        if (
          select instanceof Piece.Pawn &&
          row ===
            (enpassant.current.row < 4
              ? enpassant.current.row - 1
              : enpassant.current.row + 1) &&
          col === enpassant.current.col
        ) {
          // 앙파상
          step.dead = enpassant.current;
          board[enpassant.current.row][enpassant.current.col] = new Piece.Base(
            board,
            enpassant.current.row,
            enpassant.current.col
          ); // 잡힌 자리를 빈칸으로
          step.etc = 'enpassant';
        }
        step.etc = select.isMove ? 'enpassant' : 'enpassantAndFirstMove';
        enpassant.current = null; // 앙파상 권리 잃음
        lastMove.current = 0;
      }
      console.log(step.etc);

      // 실제로 기물 이동
      lastMove.current++;
      if (step.etc === 'castling') {
        // 캐슬링
        const [king, rook, rookCol] =
          piece instanceof Piece.King
            ? [piece, select, select.col]
            : [select, piece, col];
        king.move(row, rookCol < 4 ? 2 : 6);
        rook.move(row, rookCol < 4 ? 3 : 5);
      } else {
        select.move(row, col);
      }
      if (select instanceof Piece.Pawn) {
        lastMove.current = 0;
      }

      go(select);
      setHistory(history.concat(step));
      setTurn(!turn);
    } else if (piece.color === turn) {
      // 내 기물을 선택했을 때
      initSelect(); // 색칠된 거 초기화
      setSelect(piece);
      piece.selectable().forEach((value) => {
        value.isHighlight = true;
      });
    } else {
      initSelect(); // 색칠된 거 초기화
    }
  };

  const cancel = (event) => {
    event.preventDefault();
    if (history.length !== 0) {
      initSelect(); // 색칠된 거 초기화
      const newHistory = history.slice();
      const historyObj = newHistory.pop();
      const { piece, from, dead, etc } = historyObj;
      if (etc === 'castling') {
        // 캐슬링
        from.move(from.row, 4); // 킹
        from.isMove = false;
        piece.move(piece.row, piece.col < 4 ? 0 : 7); // 룩
        piece.isMove = false;
      } else {
        piece.move(from.row, from.col);
        if (etc === 'firstMove' || etc === 'enpassantAndFirstMove') {
          // 처음 움직일 때
          piece.isMove = false;
        }
        if (dead !== null) {
          // 잡힌 기물이 있으면
          board[dead.row][dead.col] = dead;
        }
      }
      switch (etc) {
        case 'enpassant': // 앙파상
        case 'enpassantAndFirstMove':
          enpassant.current = newHistory[newHistory.length - 1].piece; // 직전에 움직인 폰
          break;

        default:
          enpassant.current = null;
          break;
      }
      setHistory(newHistory);
      setTurn(!turn);
    }
  };

  const initialize = () => {
    setBoard(initBoard());
    setHistory([]);
    setTurn(false);
    enpassant.current = null;
    lastMove.current = 0;
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

export default Chess;
