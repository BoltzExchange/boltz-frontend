import { connect } from 'react-redux';
import LandingPage from './landingpage';
import { toggleSwapMode, setSwapAmount } from '../swap/swapActions';
import { nav } from '../../action';

const mapDispatchToProps = dispatch => ({
  toggleSwapMode: () => dispatch(toggleSwapMode()),
  goSwap: () => dispatch(nav.goSwap()),
  goRefund: () => dispatch(nav.goRefund()),
  goHome: () => dispatch(nav.goHome()),
  setSwapAmount: (sent, received) => dispatch(setSwapAmount(sent, received)),
});

export default connect(
  undefined,
  mapDispatchToProps
)(LandingPage);
