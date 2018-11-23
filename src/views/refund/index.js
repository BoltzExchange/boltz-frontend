import { connect } from 'react-redux';
import Refund from './refund';
import * as actions from './refundActions';

const mapStateToProps = state => ({
  inRefundMode: state.refundReducer.inRefundMode,
});

const mapDispatchToProps = dispatch => ({
  toggleRefundMode: () => dispatch(actions.toggleRefundMode()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Refund);
