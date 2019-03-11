import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Link from '../../../components/link';
import View from '../../../components/view';
import QrCode from '../../../components/qrcode';
import { copyToClipBoard, getExplorer } from '../../../scripts/utils';

const styles = () => ({
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
  info: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
  },
  invoice: {
    fontSize: '20px',
    color: 'grey',
    wordBreak: 'break-word',
    paddingLeft: '15px',
    paddingRight: '15px',
    '@media (max-width: 425px)': {
      fontSize: '16px',
    },
    '@media (max-width: 320px)': {
      fontSize: '10px',
    },
  },
  link: {
    '@media (max-width: 425px)': {
      fontSize: '16px',
    },
  },
  title: {
    fontSize: '30px',
    textAlign: 'center',
    '@media (max-width: 425px)': {
      fontSize: '16px',
    },
  },
  action: {
    color: 'blue',
    fontWeight: '600',
    fontSize: '30px',
    marginLeft: '50%',
    '&:hover': {
      cursor: 'pointer',
    },
    '@media (max-width: 425px)': {
      fontSize: '18px',
    },
  },
});

class PayInvoice extends React.Component {
  componentDidMount() {
    const { swapResponse, webln } = this.props;

    console.log(webln);
    if (webln) {
      webln.sendPayment(swapResponse.invoice);
    }
  }

  render() {
    const { classes, swapInfo, swapResponse } = this.props;
    const link = swapResponse
      ? `${getExplorer(swapInfo.quote)}/${swapResponse.lockupTransactionHash}`
      : '';

    return (
      <View className={classes.wrapper}>
        <View className={classes.qrcode}>
          {window.innerWidth <= 375 ? (
            <QrCode size={200} link={swapResponse.invoice} />
          ) : (
            <QrCode size={300} link={swapResponse.invoice} />
          )}
          <Link
            className={classes.link}
            to={link}
            text={'Click here to see the lockup transaction.'}
          />
        </View>
        <View className={classes.info}>
          <p className={classes.title}>
            Pay this {swapInfo.base} Lightning invoice
          </p>
          <p className={classes.invoice} id="copy">
            {swapResponse.invoice}
          </p>
          <span className={classes.action} onClick={() => copyToClipBoard()}>
            Copy
          </span>
        </View>
      </View>
    );
  }
}

PayInvoice.propTypes = {
  classes: PropTypes.object.isRequired,
  swapInfo: PropTypes.object,
  swapResponse: PropTypes.string,
  webln: PropTypes.object,
};

export default injectSheet(styles)(PayInvoice);
