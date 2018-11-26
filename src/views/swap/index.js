import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { toggleSwapMode } from './swapActions';
import Swap from './swap';

const mapStateToProps = state => ({
  inSwapMode: state.swapReducer.inSwapMode,
});

const mapDispatchToProps = dispatch => ({
  toggleSwapMode: () => dispatch(toggleSwapMode()),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Swap);
