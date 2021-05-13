import PropTypes from 'prop-types';
import { Card, CardContent, Chip, Typography } from '@material-ui/core';
import styles from './Othello.module.css';

const CountField = ({ title, count, highlight }) => (
  <Card
    classes={{
      root: styles.card
    }}
    raised
  >
    <CardContent
      classes={{
        root: styles.cardContent
      }}
    >
      <Chip label={title} color={highlight ? 'primary' : 'default'} />
      <Typography variant="h5" component="h2">
        {count}
      </Typography>
    </CardContent>
  </Card>
);

CountField.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  highlight: PropTypes.bool
};

CountField.defaultProps = {
  highlight: false
};

export default CountField;
