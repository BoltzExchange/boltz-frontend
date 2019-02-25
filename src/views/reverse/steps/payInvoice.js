import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../../../components/view';
import QrCode from '../../../components/qrcode';
import { copyToClipBoard, getExplorer } from '../../../scripts/utils';

const payInvoiceStyles = () => ({
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
  },
  title: {
    fontSize: '30px',
    textAlign: 'center',
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

class StyledPayInvoice extends React.Component {
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
          <a href={link} target="_blank" rel="noopener noreferrer">
            Click here to see the lockup transaction.
          </a>
          <QrCode size={300} link={swapResponse.invoice} />
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

StyledPayInvoice.propTypes = {
  classes: PropTypes.object.isRequired,
  swapInfo: PropTypes.object,
  swapResponse: PropTypes.string,
  webln: PropTypes.object,
};

const PayInvoice = injectSheet(payInvoiceStyles)(StyledPayInvoice);

export default PayInvoice;
