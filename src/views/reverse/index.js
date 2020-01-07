import { connect } from 'react-redux';
import ReverseSwap from './reverse';
import { navigation } from '../../actions';
import {
  dataStorageSetId,
  dataStorageSetAsset,
} from '../../actions/datastorageActions';
import {
  claimSwap,
  startReverseSwap,
  completeReverseSwap,
  setReverseSwapAddress,
} from '../../actions/reverseActions';

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
  claimSwap: (nextStage, swapInfo, swapResponse) =>
    claimSwap(dispatch, nextStage, swapInfo, swapResponse),
  completeSwap: () => dispatch(completeReverseSwap()),
  setReverseSwapAddress: (address, error) =>
    dispatch(setReverseSwapAddress(address, error)),
  startReverseSwap: (info, nextStage, timelockExpired) =>
    dispatch(startReverseSwap(info, nextStage, timelockExpired)),
  dataStorageSetAsset: (asset, amount) =>
    dispatch(dataStorageSetAsset(asset, amount)),
  dataStorageSetId: id => dispatch(dataStorageSetId(id)),
  goTimelockExpired: () => dispatch(navigation.navReverseExpired()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReverseSwap);
