import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = theme => ({
  wrapper: {
    background: theme.colors.mischkaGrey,
    height: 'auto',
    width: '100%',
    margin: '10px',
    borderRadius: '15px',
  },
  bar: {
    backgroundColor: theme.colors.celloBlue,
    height: '20px',
    borderRadius: '15px',
  },
});

const ProgressBar = ({ classes, progress }) => (
  <div className={classes.wrapper}>
    <div className={classes.bar} style={{ width: `${progress}%` }} />
  </div>
);

ProgressBar.propTypes = {
  classes: PropTypes.object,
  progress: PropTypes.number,
};

export default injectSheet(styles)(ProgressBar);
