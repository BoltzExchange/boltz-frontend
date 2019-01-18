import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../../../components/view';
import QrCode from '../../../components/qrcode';
import {
  getCurrencyName,
  toWholeCoins,
  copyToClipBoard,
} from '../../../scripts/utils';

const SendTransactionStyles = () => ({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrcode: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '300px',
    height: '300px',
  },
  info: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
  },
  text: {
    fontSize: '30px',
  },
  address: {
    width: '300px',
    fontSize: '25px',
    color: 'grey',
    wordBreak: 'break-word',
  },
  action: {
    color: 'blue',
    fontWeight: '600',
    fontSize: '30px',
    marginLeft: '50%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const StyledSendTransaction = ({ classes, swapInfo, swapResponse }) => (
  <View className={classes.wrapper}>
    <View className={classes.qrcode}>
      <QrCode size={300} link={swapResponse.bip21} />
    </View>
    <View className={classes.info}>
      <p className={classes.text}>
        Send{' '}
        <b>
          {' '}
          {toWholeCoins(swapResponse.expectedAmount)} {swapInfo.base}{' '}
        </b>{' '}
        <br />
        on <b>{getCurrencyName(swapInfo.base)}</b> <br />
        blockchain address:
      </p>
      <p className={classes.address} id="copy">
        {swapResponse.address}
      </p>
      <span className={classes.action} onClick={() => copyToClipBoard()}>
        Copy
      </span>
      <p>
        If the address does not work with your wallet: <br />
        <a
          target={'_blank'}
          href="https://litecoin-project.github.io/p2sh-convert/"
        >
          use this tool
        </a>
      </p>
    </View>
  </View>
);

StyledSendTransaction.propTypes = {
  classes: PropTypes.object.isRequired,
  swapInfo: PropTypes.object.isRequired,
  swapResponse: PropTypes.object.swapResponse,
};

const SendTransaction = injectSheet(SendTransactionStyles)(
  StyledSendTransaction
);

export default SendTransaction;
