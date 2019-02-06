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
  swapInfo: state.reverseSwapReducer.swapInfo,
  swapResponse: state.reverseSwapReducer.swapResponse.response,
  swapStatus: state.reverseSwapReducer.swapStatus,
});

const mapDispatchToProps = dispatch => ({
  goHome: () => dispatch(nav.goHome()),
  completeSwap: () => dispatch(completeReverseSwap()),
  setReverseSwapAddress: address => dispatch(setReverseSwapAddress(address)),
  startReverseSwap: (info, nextStage) =>
    dispatch(startReverseSwap(info, nextStage)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReverseSwap);
