import { connect } from 'react-redux';
import {
  toggleSwapMode,
  setSwapAmount,
  startSwap,
  startSwapDemo,
} from './swapActions';
import { nav } from '../../action/index';
import Swap from './swap';

const mapStateToProps = state => ({
  inSwapMode: state.swapReducer.inSwapMode,
  isFetching: state.swapReducer.isFetching,
  swapInfo: state.swapReducer.swapInfo,
});

const mapDispatchToProps = dispatch => ({
  toggleSwapMode: () => dispatch(toggleSwapMode()),
  setSwapAmount: (sent, received) => dispatch(setSwapAmount(sent, received)),
  goHome: () => dispatch(nav.goHome()),
  startSwap: () => dispatch(startSwap()),
  //startSwap: () => dispatch(startSwapDemo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Swap);
