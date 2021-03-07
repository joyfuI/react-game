import React from 'react';
import PropTypes from 'prop-types';
import styles from './Othello.module.css';

const CountField = ({ count, highlight, className }) => (
  <span className={`${className} ${highlight ? styles.highlight : ''}`}>
    {count}
  </span>
);

CountField.propTypes = {
  count: PropTypes.number.isRequired,
  highlight: PropTypes.bool,
  className: PropTypes.string
};

CountField.defaultProps = {
  highlight: false,
  className: ''
};

export default CountField;
