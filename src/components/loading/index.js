import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Loader from 'react-loader-spinner';

const styles = () => ({
  loading: {
    marginRight: '10px',
  },
});
const Loading = ({ width, height, color, classes, ...other }) => {
  return (
    <Loader
      className={classes.loading}
      type="TailSpin"
      color={color ? color : '#fff'}
      height={height ? height : 50}
      width={width ? width : 50}
      {...other}
    />
  );
};

Loading.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
  other: PropTypes.object,
};

export default injectSheet(styles)(Loading);
