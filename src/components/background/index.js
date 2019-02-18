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
    position: 'relative',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '25px',
    marginBottom: '25px',
  },
  boltz: {
    verticalAlign: 'bottom',
    color: theme.colors.white,
    fontSize: '15px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    alignSelf: 'center',
    zIndex: 2,
  },
});

const BackGround = ({ classes, children }) => (
  <View className={classes.wrapper}>
    {children}
    <div className={classes.boltzWrapper}>
      <span className={classes.boltz}>@ 2019 Boltz</span>
    </div>
  </View>
);

BackGround.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
};

export default injectSheet(styles)(BackGround);
