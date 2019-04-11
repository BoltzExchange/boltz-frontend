import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Loader from 'react-loader-spinner';
import View from '../view';

const styles = () => ({
  loading: {
    marginRight: '10px',
  },
});
const Loading = ({ width, height, color, classes, ...other }) => {
  return (
    <View noFlex className={classes.loading}>
      <Loader
        type="TailSpin"
        color={color ? color : '#fff'}
        height={height ? height : 40}
        width={width ? width : 40}
        {...other}
      />
    </View>
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
