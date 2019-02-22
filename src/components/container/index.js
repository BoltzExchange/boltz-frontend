import React from 'react';
import View from '../view';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = () => ({
  wrapper: {
    height: '100vh',
    width: '100vw',
  },
});

const Container = ({ classes, children, style }) => (
  <View className={classes.wrapper} style={style ? style : undefined}>
    {children}
  </View>
);

Container.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default injectSheet(styles)(Container);
