import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { toggleSwapMode, setSwapAmount } from './swapActions';
import Swap from './swap';

const mapStateToProps = state => ({
  inSwapMode: state.swapReducer.inSwapMode,
  swapInfo: state.swapReducer.swapInfo,
});

const mapDispatchToProps = dispatch => ({
  toggleSwapMode: () => dispatch(toggleSwapMode()),
  setSwapAmount: (sent, received) => dispatch(setSwapAmount(sent, received)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Swap);
