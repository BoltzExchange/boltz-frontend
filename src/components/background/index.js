import React from 'react';
import PropTypes from 'prop-types';
import View from '../view';
import injectSheet from 'react-jss';

const styles = () => ({
  wrapper: {
    backgroundImage:
      'linear-gradient(to bottom, #134357, #45587d, #846995, #c1799a, #ef9391)',
    flexDirection: 'column',
  },
});

const BackGround = ({ classes, children }) => (
  <View className={classes.wrapper} style={{ height: '100vh', width: '100vw' }}>
    {children}
  </View>
);

BackGround.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
};

export default injectSheet(styles)(BackGround);
