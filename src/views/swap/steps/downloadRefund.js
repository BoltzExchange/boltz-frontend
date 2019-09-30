import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../../../components/view';
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
