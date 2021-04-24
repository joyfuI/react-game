import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Chip,
  FormGroup,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import styles from './Omok.module.css';

const RuleField = ({ title, color, highlight, onChange, rule, start }) => (
  <Card className={styles.card}>
    <CardContent
      classes={{
        root: styles.cardContent
      }}
    >
      <Chip label={title} color={highlight ? 'primary' : 'default'} />
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              value={`${color}.double_three`}
              checked={!rule[color].double_three}
              disabled={start}
              onChange={onChange}
            />
          }
          label="3-3 금지"
        />
        <FormControlLabel
          control={
            <Switch
              value={`${color}.double_four`}
              checked={!rule[color].double_four}
              disabled={start}
              onChange={onChange}
            />
          }
          label="4-4 금지"
        />
      </FormGroup>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              value={`${color}.overline_invalidity`}
              checked={rule[color].overline_invalidity}
              disabled={start}
              onChange={onChange}
            />
          }
          label="장목 무효"
        />
        <FormControlLabel
          control={
            <Switch
              value={`${color}.overline`}
              checked={!rule[color].overline}
              disabled={start}
              onChange={onChange}
            />
          }
          label="장목 금지"
        />
      </FormGroup>
    </CardContent>
  </Card>
);

RuleField.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  highlight: PropTypes.bool,
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
  highlight: false,
  onChange: () => {},
  start: false
};

export default RuleField;
