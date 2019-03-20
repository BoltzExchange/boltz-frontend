import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../../../components/view';
import QrCode from '../../../components/qrcode';
import { toWholeCoins, copyToClipBoard } from '../../../scripts/utils';

const SendTransactionStyles = () => ({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrcode: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
  },
  image: {
    width: '300px',
    height: '300px',
  },
  info: {
    flexDirection: 'column',
    flex: 1,
  },
  text: {
    fontSize: '20px',
    '@media (max-width: 425px)': {
      fontSize: '16px',
    },
  },
  address: {
    width: '300px',
    fontSize: '18px',
    color: 'grey',
    wordBreak: 'break-word',
    '@media (max-width: 425px)': {
      fontSize: '16px',
    },
  },
  action: {
    color: 'blue',
    fontWeight: '600',
    fontSize: '20px',
    marginLeft: '70%',
    '&:hover': {
      cursor: 'pointer',
    },
    '@media (max-width: 425px)': {
      fontSize: '16px',
    },
  },
});

const StyledSendTransaction = ({ classes, swapInfo, swapResponse }) => (
  <View className={classes.wrapper}>
    <View className={classes.qrcode}>
      <QrCode size={250} link={swapResponse.bip21} />
    </View>
    <View className={classes.info}>
      <p className={classes.text}>
        Send{' '}
        <b>
          {' '}
          {toWholeCoins(swapResponse.expectedAmount)} {swapInfo.base}{' '}
        </b>{' '}
        to this address:
      </p>
      <p className={classes.address} id="copy">
        {swapResponse.address}
      </p>
      <span className={classes.action} onClick={() => copyToClipBoard()}>
        Copy
      </span>
      {swapInfo.base === 'LTC' ? (
        <p>
          If the address does not work with your wallet: <br />
          <a
            target={'_blank'}
            href="https://litecoin-project.github.io/p2sh-convert/"
          >
            use this tool
          </a>
        </p>
      ) : null}
    </View>
  </View>
);

StyledSendTransaction.propTypes = {
  classes: PropTypes.object.isRequired,
  swapInfo: PropTypes.object.isRequired,
  swapResponse: PropTypes.object.isRequired,
};

const SendTransaction = injectSheet(SendTransactionStyles)(
  StyledSendTransaction
);

export default SendTransaction;
