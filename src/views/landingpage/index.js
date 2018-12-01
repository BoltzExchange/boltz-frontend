import { connect } from 'react-redux';
import LandingPage from './landingpage';
import { setSwapAmount } from '../swap/swapActions';
import { nav, generateKeys } from '../../action';

const mapDispatchToProps = dispatch => ({
  goSwap: () => dispatch(nav.goSwap()),
  goRefund: () => dispatch(nav.goRefund()),
  goHome: () => dispatch(nav.goHome()),
  setSwapAmount: (sent, received) => dispatch(setSwapAmount(sent, received)),
  setPublicKey: () => dispatch(generateKeys.newKeys()),
});

export default connect(
  undefined,
  mapDispatchToProps
)(LandingPage);
