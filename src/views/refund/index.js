import { connect } from 'react-redux';
import Refund from './refund';
import * as actions from './refundActions';
import { nav } from '../../action';

const mapStateToProps = state => ({
  inRefundMode: state.refundReducer.inRefundMode,
});

const mapDispatchToProps = dispatch => ({
  toggleRefundMode: () => dispatch(actions.toggleRefundMode()),
  goHome: () => dispatch(nav.goHome()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Refund);
