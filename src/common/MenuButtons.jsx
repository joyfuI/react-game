import PropTypes from 'prop-types';
import { Box, ButtonGroup, Button } from '@material-ui/core';

const MenuButtons = ({ className, onCancel, onReset, disabled }) => (
  <Box className={`MenuButtons ${className}`}>
    <ButtonGroup variant="contained" disabled={disabled}>
      {onCancel ? <Button onClick={onCancel}>무르기</Button> : null}
      {onReset ? (
        <Button color="secondary" onClick={onReset}>
          초기화
        </Button>
      ) : null}
    </ButtonGroup>
  </Box>
);

MenuButtons.propTypes = {
  className: PropTypes.string,
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  disabled: PropTypes.bool
};

MenuButtons.defaultProps = {
  className: '',
  onCancel: null,
  onReset: null,
  disabled: false
};

export default MenuButtons;
