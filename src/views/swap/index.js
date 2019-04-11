import { connect } from 'react-redux';
import { startSwap, completeSwap, setSwapInvoice } from './swapActions';
import Swap from './swap';

const mapStateToProps = state => ({
  webln: state.swapReducer.webln,
  swapInfo: state.swapReducer.swapInfo,
  swapResponse: state.swapReducer.swapResponse.response,
  swapStatus: state.swapReducer.swapStatus,
  inSwapMode: state.swapReducer.inSwapMode,
});

const mapDispatchToProps = dispatch => ({
  setSwapInvoice: (invoice, error) => dispatch(setSwapInvoice(invoice, error)),
  completeSwap: () => dispatch(completeSwap()),
  startSwap: (info, cb) => dispatch(startSwap(info, cb)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Swap);
