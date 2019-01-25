import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import View from '../../../components/view';
import { FaCheckCircle } from 'react-icons/fa';

const CompleteRefundStyles = theme => ({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.colors.aeroBlue,
  },
  icon: {
    color: theme.colors.turquoise,
  },
  title: {
    margin: '15px',
    fontSize: '30px',
  },
  transaction: {
    wordBreak: 'break-all',
    paddingLeft: '1vw',
    paddingRight: '1vw',
  },
});

const StyledCompleteRefund = ({
  classes,
  refundTransaction,
  refundTransactionHash,
}) => (
  <View className={classes.wrapper}>
    <FaCheckCircle size={240} className={classes.icon} />
    <span className={classes.title}>
      Refund transaction successfully broadcasted!
    </span>
    <p>
      Your refund transaction hash: <br />
      <code className={classes.transaction}>{refundTransactionHash}</code>
    </p>

    <p>
      Raw transaction: <br />
      <code className={classes.transaction}>{refundTransaction}</code>
    </p>
  </View>
);

StyledCompleteRefund.propTypes = {
  classes: PropTypes.object.isRequired,
  refundTransaction: PropTypes.string.isRequired,
  refundTransactionHash: PropTypes.string.isRequired,
};

const CompleteRefund = injectSheet(CompleteRefundStyles)(StyledCompleteRefund);

export default CompleteRefund;
