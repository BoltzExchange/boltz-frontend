import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import ReactConfetti from 'react-confetti';
import View from '../../components/view';

const confettiStyles = () => ({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: '40px',
  },
  notifie: {
    fontSize: '25px',
    fontWeight: 300,
  },
});

const Confetti = ({ classes, notifie }) => (
  <View className={classes.wrapper}>
    <ReactConfetti
      height={window.innerHeight}
      width={window.innerWidth}
      numberOfPieces={500}
      recycle={false}
    />
    <span className={classes.text}>Viola! Swap successful!</span>
    {notifie(classes.notifie)}
  </View>
);

Confetti.propTypes = {
  classes: PropTypes.object.isRequired,
  notifie: PropTypes.func,
};

export default injectSheet(confettiStyles)(Confetti);
