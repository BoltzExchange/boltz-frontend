import React from 'react';
import PropTypes from 'prop-types';
import View from '../view';
import injectSheet from 'react-jss';

const styles = theme => ({
  wrapper: {
    flex: 1,
    backgroundImage: 'linear-gradient(to bottom, #114357, #f29492)',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  boltz: {
    color: theme.colors.white,
    fontSize: '15px',
    margin: '5px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    alignSelf: 'center',
    zIndex: 99999,
  },
});

const BackGround = ({ classes, children }) => (
  <View className={classes.wrapper}>
    {children}
    <span className={classes.boltz}>#reckless</span>
  </View>
);
BackGround.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
};

export default injectSheet(styles)(BackGround);
