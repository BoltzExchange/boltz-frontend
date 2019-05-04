import { connect } from 'react-redux';
import ReverseSwap from './reverse';
import {
  completeReverseSwap,
  setReverseSwapAddress,
  startReverseSwap,
} from '../../actions/reverseActions';
import {
  dataStorageSetAsset,
  dataStorageSetId,
} from '../../actions/datastorageActions';

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
  dataStorageSetAsset: (asset, amount) =>
    dispatch(dataStorageSetAsset(asset, amount)),
  dataStorageSetId: id => dispatch(dataStorageSetId(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReverseSwap);
