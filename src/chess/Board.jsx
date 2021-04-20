import React from 'react';
import PropTypes from 'prop-types';

const Board = ({ styles, board, onClick, onContextMenu }) => {
  const jsx = board.map((row, i) =>
    row.map((item, j) => {
      const className = [];

      if (item.color === true) {
        className.push(styles.black);
      } else if (item.color === false) {
        className.push(styles.white);
      }

      if (item.isHighlight) {
        className.push(styles.highlight);
      }

      return (
        <button
          key={`${i},${j}`}
          className={className.join(' ')}
          type="button"
          onClick={() => onClick(i, j)}
        >
          {item.toString()}
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
