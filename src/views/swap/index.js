import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Swap from './swap';

const mapStateToProps = state => ({
  inSwapMode: state.swapReducer.inSwapMode,
});

const mapDispatchToProps = () => {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Swap);
