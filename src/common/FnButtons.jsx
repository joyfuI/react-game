import React from 'react';
import PropTypes from 'prop-types';

const FnButtons = ({ cancel, onCancel, reset, onReset, disabled }) => (
  <div className="FnButtons">
    {cancel ? (
      <input
        type="button"
        value="무르기"
        onClick={onCancel}
        disabled={disabled}
      />
    ) : null}
    {reset ? (
      <input
        type="button"
        value="초기화"
        onClick={onReset}
        disabled={disabled}
      />
    ) : null}
  </div>
);

FnButtons.propTypes = {
  cancel: PropTypes.bool,
  onCancel: PropTypes.func,
  reset: PropTypes.bool,
  onReset: PropTypes.func,
  disabled: PropTypes.bool
};

FnButtons.defaultProps = {
  cancel: true,
  onCancel: () => {},
  reset: true,
  onReset: () => {},
  disabled: false
};

export default FnButtons;
