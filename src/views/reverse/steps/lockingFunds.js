import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../../../components/view';
import { getCurrencyName } from '../../../scripts/utils';

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
  },
});

const LockingFunds = ({ classes, swapInfo }) => {
  return (
    <View className={classes.wrapper}>
      <p className={classes.text}>
        Boltz is locking the <b>{getCurrencyName(swapInfo.quote)}</b> that you
        are ought <br />
        to receive, this is important to keep the <br />
        swap atomic and trustless. It might take <br />
        up to 10 minutes. Please be patient. <br />
      </p>
    </View>
  );
};

LockingFunds.propTypes = {
  swapInfo: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(LockingFunds);
