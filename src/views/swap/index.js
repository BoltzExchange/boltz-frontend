import { connect } from 'react-redux';
import {
  setSwapAmount,
  startSwap,
  // startSwapDemo,
  setSwapInvoice,
} from './swapActions';
import { nav } from '../../action/index';
import Swap from './swap';

const mapStateToProps = state => ({
  inSwapMode: state.swapReducer.inSwapMode,
  isFetching: state.swapReducer.isFetching,
  swapInfo: state.swapReducer.swapInfo,
});

const mapDispatchToProps = dispatch => ({
  setSwapAmount: (sent, received) => dispatch(setSwapAmount(sent, received)),
  setSwapInvoice: invoice => dispatch(setSwapInvoice(invoice)),
  goHome: () => dispatch(nav.goHome()),
  startSwap: () => dispatch(startSwap()),
  //startSwap: () => dispatch(startSwapDemo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Swap);
