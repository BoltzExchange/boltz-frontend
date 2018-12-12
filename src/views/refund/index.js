import { connect } from 'react-redux';
import Refund from './refund';
import * as actions from './refundActions';
import { nav } from '../../action';

const mapStateToProps = state => ({
  refundFile: state.refundReducer.refundFile,
  transactionHash: state.refundReducer.transactionHash,
  destinationAddress: state.refundReducer.destinationAddress,
  refundTransaction: state.refundReducer.refundTransaction,
  refundTransactionHash: state.refundReducer.refundTransactionHash,
});

const mapDispatchToProps = dispatch => ({
  goHome: () => dispatch(nav.goHome()),
  setRefundFile: file => dispatch(actions.setRefundFile(file)),
  setTransactionHash: hash => dispatch(actions.setTransactionHash(hash)),
  setDestinationAddress: address =>
    dispatch(actions.setDestinationAddress(address)),
  startRefund: (refundFile, transactionHash, destinationAddress, cb) =>
    dispatch(
      actions.startRefund(refundFile, transactionHash, destinationAddress, cb)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Refund);
