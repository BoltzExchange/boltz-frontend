import { connect } from 'react-redux';
import { startSwap, completeSwap, setSwapInvoice } from './swapActions';
import { nav } from '../../action/index';
import Swap from './swap';

const mapStateToProps = state => ({
  inSwapMode: state.swapReducer.inSwapMode,
  swapInfo: state.swapReducer.swapInfo,
  swapResponse: state.swapReducer.swapResponse.response,
  swapStatus: state.swapReducer.swapStatus,
});

const mapDispatchToProps = dispatch => ({
  setSwapInvoice: (invoice, error) => dispatch(setSwapInvoice(invoice, error)),
  goHome: () => dispatch(nav.goHome()),
  completeSwap: () => dispatch(completeSwap()),
  startSwap: (info, cb) => dispatch(startSwap(info, cb)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Swap);
