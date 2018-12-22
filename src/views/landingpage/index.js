import { connect } from 'react-redux';
import LandingPage from './landingpage';
import { setSwapAmount } from '../swap/swapActions';
import { nav, generateKeys } from '../../action';
import * as actions from './landingpageActions';

const mapStateToProps = state => ({
  rates: state.landingpageReducer.rates,
  currencies: state.landingpageReducer.currencies,
});

const mapDispatchToProps = dispatch => ({
  goSwap: () => dispatch(nav.goSwap()),
  goRefund: () => dispatch(nav.goRefund()),
  goHome: () => dispatch(nav.goHome()),
  setSwapAmount: state => dispatch(setSwapAmount(state)),
  setPublicKey: () => dispatch(generateKeys.newKeys()),
  getPairs: cb => dispatch(actions.getPairs(cb)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
