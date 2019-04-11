import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Link from '../../../components/link';
import View from '../../../components/view';
import { getCurrencyName, getExplorer } from '../../../utils';

const styles = () => ({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: '32px',
    padding: '20px',
    '@media (max-width: 425px)': {
      fontSize: '16px',
    },
  },
});

const LockingFunds = ({ classes, swapInfo, swapResponse }) => {
  const link = swapResponse
    ? `${getExplorer(swapInfo.quote)}/${swapResponse.lockupTransactionHash}`
    : '';
  return (
    <View className={classes.wrapper}>
      <p className={classes.text}>
        Boltz is locking the <b>{getCurrencyName(swapInfo.quote)}</b> that you
        are ought <br />
        to receive, this is important to keep the <br />
        swap atomic and trustless. It might take <br />
        up to 10 minutes. Please be patient. <br />
        <Link to={link} text={'Click here'} /> to see the lockup transaction.
      </p>
    </View>
  );
};

LockingFunds.propTypes = {
  swapInfo: PropTypes.object.isRequired,
  swapResponse: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(LockingFunds);
