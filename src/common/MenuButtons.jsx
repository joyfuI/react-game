import React from 'react';
import PropTypes from 'prop-types';
import { Box, ButtonGroup, Button } from '@material-ui/core';

const MenuButtons = ({ onCancel, onReset, disabled }) => (
  <Box className="MenuButtons">
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
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  disabled: PropTypes.bool
};

MenuButtons.defaultProps = {
  onCancel: null,
  onReset: null,
  disabled: false
};

export default MenuButtons;
