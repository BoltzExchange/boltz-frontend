import { connect } from 'react-redux';
import {
  setSwapAmount,
  startSwap,
  completeSwap,
  setSwapInvoice,
} from './swapActions';
import { nav } from '../../action/index';
import Swap from './swap';

const mapStateToProps = state => ({
  inSwapMode: state.swapReducer.inSwapMode,
  isFetching: state.swapReducer.isFetching,
  swapInfo: state.swapReducer.swapInfo,
  swapResponse: state.swapReducer.swapResponse.response,
});

const mapDispatchToProps = dispatch => ({
  setSwapAmount: (sent, received) => dispatch(setSwapAmount(sent, received)),
  setSwapInvoice: invoice => dispatch(setSwapInvoice(invoice)),
  goHome: () => dispatch(nav.goHome()),
  completeSwap: () => dispatch(completeSwap()),
  startSwap: (info, cb) => dispatch(startSwap(info, cb)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Swap);
