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
    fontSize: '30px',
  },
});

const StyledConfetti = ({ classes }) => (
  <View className={classes.wrapper}>
    <ReactConfetti
      height={window.innerHeight}
      width={window.innerWidth}
      numberOfPieces={500}
      recycle={false}
    />
    <span className={classes.text}>Viola! Swap successful!</span>
  </View>
);

StyledConfetti.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Confetti = injectSheet(confettiStyles)(StyledConfetti);

export default Confetti;
