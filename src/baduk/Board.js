import React from 'react';

const Board = ({ board, onClick, onContextMenu }) => {
  const jsx = board.map((row, i) =>
    row.map((item, j) => {
      const className = [];
      if (i === 0) {
        if (j === 0) {
          className.push('vertex1');
        } else if (j === row.length - 1) {
          className.push('vertex3');
        } else {
          className.push('edge2');
        }
      } else if (i === board.length - 1) {
        if (j === 0) {
          className.push('vertex7');
        } else if (j === row.length - 1) {
          className.push('vertex9');
        } else {
          className.push('edge8');
        }
      } else {
        if (j === 0) {
          className.push('edge4');
        } else if (j === row.length - 1) {
          className.push('edge6');
        } else {
          className.push('plane');
        }
      }
      if (item === true) {
        className.push('black');
      } else if (item === false) {
        className.push('white');
      }

      return (
        <button
          key={`${i},${j}`}
          className={className.join(' ')}
          onClick={() => onClick(i, j)}
        >
          {item === null ? '' : '●'}
        </button>
      );
    })
  );
  jsx.forEach((item, index) => item.push(<br key={index} />));

  return (
    <div className="board" onContextMenu={onContextMenu}>
      {jsx}
    </div>
  );
};

export default Board;
