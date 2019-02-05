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
    fontSize: '42px',
    fontWeight: 300,
  },
  transaction: {
    wordBreak: 'break-all',
    paddingLeft: '1vw',
    paddingRight: '1vw',
    fontSize: '24px',
    fontWeight: 300,
  },
});

const StyledCompleteRefund = ({ classes, refundTransactionHash }) => (
  <View className={classes.wrapper}>
    <FaCheckCircle size={200} className={classes.icon} />
    <span className={classes.title}> Success! </span>
    <p className={classes.transaction}>
      <a
        href={`https://blockstream.info/tx/${refundTransactionHash}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Click here
      </a>{' '}
      to see the refund transaction
    </p>
  </View>
);

StyledCompleteRefund.propTypes = {
  classes: PropTypes.object.isRequired,
  refundTransactionHash: PropTypes.string.isRequired,
};

const CompleteRefund = injectSheet(CompleteRefundStyles)(StyledCompleteRefund);

export default CompleteRefund;
