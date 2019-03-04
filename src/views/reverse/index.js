import { connect } from 'react-redux';
import {
  completeReverseSwap,
  setReverseSwapAddress,
  startReverseSwap,
} from './reverseActions';
import { nav } from '../../action/index';
import ReverseSwap from './reverse';

const mapStateToProps = state => ({
  webln: state.reverseSwapReducer.webln,
  inSwapMode: state.reverseSwapReducer.inSwapMode,
  isFetching: state.reverseSwapReducer.isFetching,
  isReconnecting: state.reverseSwapReducer.isReconnecting,
  swapInfo: state.reverseSwapReducer.swapInfo,
  swapResponse: state.reverseSwapReducer.swapResponse.response,
  swapFailResponse: !state.reverseSwapReducer.swapResponse.success,
  swapStatus: state.reverseSwapReducer.swapStatus,
});

const mapDispatchToProps = dispatch => ({
  goHome: () => dispatch(nav.goHome()),
  completeSwap: () => dispatch(completeReverseSwap()),
  goTimelockExpired: () => dispatch(nav.goReverseSwapTimelockExpired()),
  setReverseSwapAddress: address => dispatch(setReverseSwapAddress(address)),
  startReverseSwap: (info, nextStage, timelockExpired) =>
    dispatch(startReverseSwap(info, nextStage, timelockExpired)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReverseSwap);
