import PropTypes from 'prop-types';

const Board = ({ styles, board, onTouchStart, onTouchEnd }) => {
  const jsx = board.map((row, i) =>
    row.map((item, j) => (
      <button
        key={`${i},${j}`}
        className={item ? styles[`c${item}`] : null}
        type="button"
      >
        {item}
      </button>
    ))
  );
  jsx.forEach((item, index) => item.push(<br key={index} />));

  return (
    <div
      className={styles.board}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {jsx}
    </div>
  );
};

Board.propTypes = {
  styles: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  onTouchStart: PropTypes.func,
  onTouchEnd: PropTypes.func,
};

Board.defaultProps = {
  onTouchStart: () => {},
  onTouchEnd: () => {},
};

export default Board;
