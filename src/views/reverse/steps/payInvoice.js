import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../../../components/view';
import QrCode from '../../../components/qrcode';
import { copyToClipBoard } from '../../../scripts/utils';

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
    const { invoice, webln } = this.props;

    console.log(webln);
    if (webln) {
      webln.sendPayment(invoice);
    }
  }

  render() {
    const { classes, asset, invoice } = this.props;

    return (
      <View className={classes.wrapper}>
        <View className={classes.qrcode}>
          <QrCode size={300} link={invoice} />
        </View>
        <View className={classes.info}>
          <p className={classes.title}>Pay this {asset} Lightning invoice</p>
          <p className={classes.invoice} id="copy">
            {invoice}
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
  asset: PropTypes.string.isRequired,
  invoice: PropTypes.string.isRequired,
  webln: PropTypes.object,
};

const PayInvoice = injectSheet(payInvoiceStyles)(StyledPayInvoice);

export default PayInvoice;
