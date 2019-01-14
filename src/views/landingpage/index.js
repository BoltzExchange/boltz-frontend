import { connect } from 'react-redux';
import LandingPage from './landingpage';
import { initSwap } from '../swap/swapActions';
import { initReverseSwap } from '../reverse/reverseActions';
import { nav } from '../../action';
import * as actions from './landingpageActions';

const mapStateToProps = state => ({
  rates: state.landingpageReducer.rates,
  currencies: state.landingpageReducer.currencies,
});

const mapDispatchToProps = dispatch => ({
  goSwap: () => dispatch(nav.goSwap()),
  goReverseSwap: () => dispatch(nav.goReverseSwap()),
  goRefund: () => dispatch(nav.goRefund()),
  goHome: () => dispatch(nav.goHome()),
  initSwap: state => dispatch(initSwap(state)),
  initReverseSwap: state => dispatch(initReverseSwap(state)),
  getPairs: cb => dispatch(actions.getPairs(cb)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
