import React from 'react';
import PropTypes from 'prop-types';

const Board = ({ styles, board, onClick, onContextMenu }) => {
  const jsx = board.map((row, i) =>
    row.map((item, j) => {
      const className = [];

      if (i === 0) {
        if (j === 0) {
          className.push(styles.vertex1);
        } else if (j === row.length - 1) {
          className.push(styles.vertex3);
        } else {
          className.push(styles.edge2);
        }
      } else if (i === board.length - 1) {
        if (j === 0) {
          className.push(styles.vertex7);
        } else if (j === row.length - 1) {
          className.push(styles.vertex9);
        } else {
          className.push(styles.edge8);
        }
      } else if (j === 0) {
        className.push(styles.edge4);
      } else if (j === row.length - 1) {
        className.push(styles.edge6);
      } else {
        className.push(styles.plane);
      }

      if (item === true) {
        className.push(styles.black);
      } else if (item === false) {
        className.push(styles.white);
      }

      return (
        <button
          key={`${i},${j}`}
          className={className.join(' ')}
          type="button"
          onClick={() => onClick(i, j)}
        >
          {item === null ? '' : '●'}
        </button>
      );
    })
  );
  jsx.forEach((item, index) => item.push(<br key={index} />));

  return (
    <div className={styles.board} onContextMenu={onContextMenu}>
      {jsx}
    </div>
  );
};

Board.propTypes = {
  styles: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  board: PropTypes.arrayOf(PropTypes.array).isRequired,
  onClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func
};

Board.defaultProps = {
  onContextMenu: () => {}
};

export default Board;
