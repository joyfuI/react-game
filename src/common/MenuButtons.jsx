import React from 'react';
import PropTypes from 'prop-types';

const MenuButtons = ({ onCancel, onReset, disabled }) => (
  <div className="MenuButtons">
    {onCancel ? (
      <input
        type="button"
        value="무르기"
        onClick={onCancel}
        disabled={disabled}
      />
    ) : null}
    {onReset ? (
      <input
        type="button"
        value="초기화"
        onClick={onReset}
        disabled={disabled}
      />
    ) : null}
  </div>
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
