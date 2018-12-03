import { connect } from 'react-redux';
import LandingPage from './landingpage';
import { setSwapAmount } from '../swap/swapActions';
import { nav, generateKeys } from '../../action';

const mapDispatchToProps = dispatch => ({
  goSwap: () => dispatch(nav.goSwap()),
  goRefund: () => dispatch(nav.goRefund()),
  goHome: () => dispatch(nav.goHome()),
  setSwapAmount: state => dispatch(setSwapAmount(state)),
  setPublicKey: () => dispatch(generateKeys.newKeys()),
});

export default connect(
  undefined,
  mapDispatchToProps
)(LandingPage);
