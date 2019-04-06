import { connect } from 'react-redux';
import ReverseSwap from './reverse';
import {
  completeReverseSwap,
  setReverseSwapAddress,
  startReverseSwap,
} from './reverseActions';

const mapStateToProps = state => ({
  webln: state.reverseSwapReducer.webln,
  inSwapMode: state.reverseSwapReducer.inSwapMode,
  isFetching: state.reverseSwapReducer.isFetching,
  isReconnecting: state.reverseSwapReducer.isReconnecting,
  swapInfo: state.reverseSwapReducer.swapInfo,
  swapResponse: state.reverseSwapReducer.swapResponse.response,
  swapFailResponse: state.reverseSwapReducer.swapResponse.success,
  swapStatus: state.reverseSwapReducer.swapStatus,
  invalidAddress: state.reverseSwapReducer.invalidAddress,
});

const mapDispatchToProps = dispatch => ({
  completeSwap: () => dispatch(completeReverseSwap()),
  setReverseSwapAddress: (address, error) =>
    dispatch(setReverseSwapAddress(address, error)),
  startReverseSwap: (info, nextStage, timelockExpired) =>
    dispatch(startReverseSwap(info, nextStage, timelockExpired)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReverseSwap);
