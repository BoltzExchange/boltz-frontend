import React from 'react';
import PropTypes from 'prop-types';
import View from '../view';
import injectSheet from 'react-jss';

const styles = theme => ({
  wrapper: {
    height: '100vh',
    width: '100vw',
    backgroundImage: 'linear-gradient(to bottom, #114357, #f29492)',
    flexDirection: 'column',
  },
  boltz: {
    color: theme.colors.white,
    fontSize: '15px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    alignSelf: 'center',
    paddingBottom: '10px',
    zIndex: 99999,
  },
});

const BackGround = ({ classes, children }) => (
  <View className={classes.wrapper}>
    {children}
    <span className={classes.boltz}>@ 2019 Boltz</span>
  </View>
);

BackGround.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
};

export default injectSheet(styles)(BackGround);
