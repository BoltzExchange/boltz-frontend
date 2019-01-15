import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../../../components/view';

const completeSwapStyles = () => ({
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

const StyledCompleteSwap = ({ classes }) => (
  <View className={classes.wrapper}>
    <span className={classes.text}>Viola! Swap is successful!</span>
  </View>
);

StyledCompleteSwap.propTypes = {
  classes: PropTypes.object.isRequired,
};

const CompleteSwap = injectSheet(completeSwapStyles)(StyledCompleteSwap);

export default CompleteSwap;
