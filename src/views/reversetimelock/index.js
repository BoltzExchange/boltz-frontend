import { connect } from 'react-redux';
import { nav } from '../../action';
import ReverseSwapTimelockExpired from './reverseSwapTimelockExpired';

const mapDispatchToProps = dispatch => ({
  goHome: () => dispatch(nav.goHome()),
  goRefund: () => dispatch(nav.goRefund()),
  goFaq: () => dispatch(nav.goFaq()),
});

export default connect(
  () => {},
  mapDispatchToProps
)(ReverseSwapTimelockExpired);
