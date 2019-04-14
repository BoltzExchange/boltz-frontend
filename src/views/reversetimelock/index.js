import { connect } from 'react-redux';
import { dataStorageClear } from '../../actions/datastorageActions';
import ReverseSwapTimelockExpired from './ReverseSwapTimelockExpired';

const mapStateToProps = state => ({
  id: state.dataStorage.id,
  asset: state.dataStorage.asset,
  amount: state.dataStorage.amount,
});

const mapDispatchToProps = dispatch => ({
  dataStorageClear: () => dispatch(dataStorageClear()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReverseSwapTimelockExpired);
