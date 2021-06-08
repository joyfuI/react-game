import PropTypes from 'prop-types';

const Board = ({ styles, board, onClick, onRightClick, onDoubleClick }) => {
  const jsx = board.map((row, i) =>
    row.map((item, j) => {
      const className = [];
      let text;

      if (item.open) {
        className.push(styles.open);
        switch (item.bomb) {
          case -1:
            className.push(styles.bomb);
            text = '💣';
            break;

          case 0:
            text = null;
            break;

          default:
            className.push(styles[`bomb${item.bomb}`]);
            text = item.bomb;
            break;
        }
      } else if (item.flag) {
        className.push(styles.flag);
        text = '🚩';
      }

      return (
        <button
          key={`${i},${j}`}
          className={className.join(' ')}
          type="button"
          onClick={() => onClick(i, j)}
          onDoubleClick={() => onDoubleClick(i, j)}
          onMouseDown={(e) => {
            if (e.button === 1) {
              // 휠버튼 클릭했을 때 쓸데없는 동작 막기
              e.preventDefault();
            }
          }}
          onMouseUp={(e) => {
            if (e.button === 1) {
              // 휠버튼 클릭
              e.preventDefault();
              onDoubleClick(i, j);
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            onRightClick(i, j);
          }}
        >
          {text}
        </button>
      );
    })
  );
  jsx.forEach((item, index) => item.push(<br key={index} />));

  return <div className={styles.board}>{jsx}</div>;
};

Board.propTypes = {
  styles: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  board: PropTypes.arrayOf(PropTypes.array).isRequired,
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onRightClick: PropTypes.func.isRequired
};

export default Board;
