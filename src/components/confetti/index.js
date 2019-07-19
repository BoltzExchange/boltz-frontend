import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import ReactConfetti from 'react-confetti';
import View from '../../components/view';

const confettiStyles = () => ({
  wrapper: {
    flex: '1 0 100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: '40px',
    '@media (max-width: 425px)': {
      fontSize: '20px',
    },
  },
  notifie: {
    fontSize: '25px',
    fontWeight: 300,
    '@media (max-width: 425px)': {
      fontSize: '18px',
    },
  },
});

const Confetti = ({ classes, notifie }) => (
  <View className={classes.wrapper}>
    <ReactConfetti
      height={window.innerHeight}
      width={window.innerWidth}
      numberOfPieces={500}
      recycle={false}
      style={{ pointerEvents: 'none' }}
    />
    <span className={classes.text}>Voilà! Swap successful!</span>
    {notifie(classes.notifie)}
  </View>
);

Confetti.propTypes = {
  classes: PropTypes.object.isRequired,
  notifie: PropTypes.func,
};

export default injectSheet(confettiStyles)(Confetti);
