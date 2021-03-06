import React from 'react';
import PropTypes from 'prop-types';

const RuleField = ({ title, color, onChange, rule, start }) => (
  <fieldset>
    <legend>{title}</legend>
    <label>
      <input
        type="checkbox"
        value={`${color}.double_three`}
        onChange={onChange}
        checked={!rule[color].double_three}
        disabled={start}
      />
      3-3 금지
    </label>
    <label>
      <input
        type="checkbox"
        value={`${color}.double_four`}
        onChange={onChange}
        checked={!rule[color].double_four}
        disabled={start}
      />
      4-4 금지
    </label>
    <br />
    <label>
      <input
        type="checkbox"
        value={`${color}.overline_invalidity`}
        onChange={onChange}
        checked={rule[color].overline_invalidity}
        disabled={start}
      />
      장목 무효
    </label>
    <label>
      <input
        type="checkbox"
        value={`${color}.overline`}
        onChange={onChange}
        checked={!rule[color].overline}
        disabled={start}
      />
      장목 금지
    </label>
  </fieldset>
);

RuleField.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  rule: PropTypes.shape({
    name: PropTypes.string,
    black: PropTypes.shape({
      double_three: PropTypes.bool,
      double_four: PropTypes.bool,
      overline: PropTypes.bool,
      overline_invalidity: PropTypes.bool
    }),
    white: PropTypes.shape({
      double_three: PropTypes.bool,
      double_four: PropTypes.bool,
      overline: PropTypes.bool,
      overline_invalidity: PropTypes.bool
    })
  }).isRequired,
  start: PropTypes.bool
};

RuleField.defaultProps = {
  title: '',
  onChange: () => {},
  start: false
};

export default RuleField;
