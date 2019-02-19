import React from 'react';
import PropTypes from 'prop-types';
import View from '../view';
import injectSheet from 'react-jss';

const styles = theme => ({
  wrapper: {
    width: '100vw',
    minHeight: '100vh',
    flexDirection: 'column',
    backgroundImage: 'linear-gradient(to bottom, #114357, #f29492)',
  },
  boltzWrapper: {
    marginTop: '25px',
    marginBottom: '25px',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    alignItems: 'center',
  },
  boltz: {
    bottom: 0,
    fontSize: '15px',
    fontStyle: 'normal',
    alignSelf: 'center',
    lineHeight: 'normal',
    fontWeight: 'normal',
    fontStretch: 'normal',
    letterSpacing: 'normal',
    verticalAlign: 'bottom',
    color: theme.colors.white,
    zIndex: 2,
  },
});

const BackGround = ({ classes, children }) => (
  <View className={classes.wrapper}>
    {children}
    <div className={classes.boltzWrapper}>
      <span className={classes.boltz}>#reckless</span>
    </div>
  </View>
);

BackGround.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
};

export default injectSheet(styles)(BackGround);
