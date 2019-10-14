import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { isIOS } from 'react-device-detect';
import View from '../../../components/view';
import { navigation } from '../../../actions';
import { createRefundQr } from '../../../utils/refundUtils';

const DownloadRefundStyles = () => ({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  info: {
    fontSize: '30px',
    alignSelf: 'flex-start',
    '@media (max-width: 425px)': {
      fontSize: '16px',
    },
  },
  address: {
    fontSize: '30px',
    alignSelf: 'flex-start',
    '@media (max-width: 425px)': {
      fontSize: '16px',
    },
  },
  link: {
    fontSize: '24px',
  },
});

class StyledDownloadRefund extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.ref.current.click();
  }

  render() {
    if (isIOS) {
      const dialog = window.confirm(
        'Tapping OK will open refund.png in a new tab which will be needed in case of a refund.' +
          'Please save it in your gallary. This is important for conserving the non-custodial nature of the swap'
      );

      if (dialog !== true) {
        navigation.navHome();
      }
    }

    const {
      classes,
      currency,
      privateKey,
      redeemScript,
      timeoutBlockHeight,
    } = this.props;

    createRefundQr();

    return (
      <View className={classes.wrapper}>
        <View className={classes.placer}>
          <p className={classes.info}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              ref={this.ref}
              href={createRefundQr(
                currency,
                privateKey,
                redeemScript,
                timeoutBlockHeight
              )}
              download={'refund.png'}
            >
              Click here
            </a>{' '}
            if the download of &lsquo;refund.png&lsquo; <br /> didn&apos;t start
            automatically.
          </p>
          <p className={classes.address}>
            This refund file can be used to trustlessly <br />
            claim your coins back in case of failure of this <br />
            swap. It is recommended to not delete this <br />
            file until after the completion of this swap.
          </p>
        </View>
      </View>
    );
  }
}

StyledDownloadRefund.propTypes = {
  classes: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  redeemScript: PropTypes.string.isRequired,
  privateKey: PropTypes.string.isRequired,
  timeoutBlockHeight: PropTypes.number.isRequired,
};

const DownloadRefund = injectSheet(DownloadRefundStyles)(StyledDownloadRefund);

export default DownloadRefund;
