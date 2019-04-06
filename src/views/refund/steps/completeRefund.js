import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import Link from '../../../components/link';
import View from '../../../components/view';
import { getExplorer } from '../../../utils';
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
    '@media (max-width: 425px)': {
      fontSize: '16px',
    },
  },
});

const StyledCompleteRefund = ({ classes, currency, refundTransactionHash }) => (
  <View className={classes.wrapper}>
    <FaCheckCircle size={200} className={classes.icon} />
    <span className={classes.title}> Success! </span>
    <p className={classes.transaction}>
      <Link
        to={`${getExplorer(currency)}/${refundTransactionHash}`}
        text={'Click here'}
      />{' '}
      to see the refund transaction
    </p>
  </View>
);

StyledCompleteRefund.propTypes = {
  classes: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  refundTransactionHash: PropTypes.string.isRequired,
};

const CompleteRefund = injectSheet(CompleteRefundStyles)(StyledCompleteRefund);

export default CompleteRefund;
