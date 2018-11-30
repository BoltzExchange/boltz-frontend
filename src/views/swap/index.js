import { connect } from 'react-redux';
import { toggleSwapMode, setSwapAmount, startSwap } from './swapActions';
import Swap from './swap';

const mapStateToProps = state => ({
  inSwapMode: state.swapReducer.inSwapMode,
  isFetching: state.swapReducer.isFetching,
  swapInfo: state.swapReducer.swapInfo,
});

const mapDispatchToProps = dispatch => ({
  toggleSwapMode: () => dispatch(toggleSwapMode()),
  setSwapAmount: (sent, received) => dispatch(setSwapAmount(sent, received)),
  startSwap: () => dispatch(startSwap()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Swap);
