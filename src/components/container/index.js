import React from 'react';
import injectSheet from 'react-jss';
import View from '../view';
import PropTypes from 'prop-types';

const styles = () => ({
  wrapper: {
    flexDirection: 'column',
    flex: '0 0 content',
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
