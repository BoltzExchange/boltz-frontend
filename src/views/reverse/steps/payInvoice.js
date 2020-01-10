import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Link from '../../../components/link';
import View from '../../../components/view';
import QrCode from '../../../components/qrcode';
import { copyToClipBoard } from '../../../utils';
import DetectResize from '../../../components/detectresize';

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
  invoiceInfo: {
    paddingRight: '15px',
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
  showedWebln = false;

  render() {
    const { classes, webln, swapInfo, swapResponse } = this.props;

    if (webln && !this.showedWebln) {
      if (swapResponse.invoice) {
        this.showedWebln = true;
        webln.sendPayment(swapResponse.invoice);
      }
    }

    return (
      <View className={classes.wrapper}>
        {window.innerWidth < 768 ? (
          <div />
        ) : (
          <View className={classes.qrcode}>
            <DetectResize>
              {width =>
                width <= 375 ? (
                  <QrCode size={200} link={swapResponse.invoice} />
                ) : (
                  <QrCode size={300} link={swapResponse.invoice} />
                )
              }
            </DetectResize>
          </View>
        )}
        <View className={classes.info}>
          <p className={classes.title}>
            Pay this {swapInfo.base} Lightning invoice:
          </p>
          <p className={classes.invoiceInfo}>
            This is a{' '}
            <Link
              text="HOLD invoice"
              to="https://wiki.ion.radar.tech/tech/research/hodl-invoice"
            />{' '}
            and its preimage was generated in your browser. Which means we
            cannot receive the lightning coins unless your browser claims the
            onchain funds for you.
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
