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
    fontWeight: 300,
  },
  swapDetail: {
    fontSize: '25px',
  },
});

const Confetti = ({
  classes,
  sentCoin,
  receivedCoin,
  sentAmount,
  receivedAmount,
}) => (
  <View className={classes.wrapper}>
    <ReactConfetti
      height={window.innerHeight}
      width={window.innerWidth}
      numberOfPieces={500}
      recycle={false}
    />
    <span className={classes.text}>Viola! Swap successful!</span>
    <span className={classes.swapDetail}>
      You sent {sentAmount} {sentCoin} and received {receivedCoin}{' '}
      {receivedAmount}
    </span>
  </View>
);

Confetti.propTypes = {
  classes: PropTypes.object.isRequired,
  sentCoin: PropTypes.string.isRequired,
  receivedCoin: PropTypes.string.isRequired,
  sentAmount: PropTypes.string.isRequired,
  receivedAmount: PropTypes.string.isRequired,
};

export default injectSheet(confettiStyles)(Confetti);
