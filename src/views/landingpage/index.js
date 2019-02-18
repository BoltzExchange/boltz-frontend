import { connect } from 'react-redux';
import { nav } from '../../action';
import LandingPage from './landingpage';
import { initSwap } from '../swap/swapActions';
import * as actions from './landingpageActions';
import { initReverseSwap } from '../reverse/reverseActions';

const mapStateToProps = state => ({
  rates: state.landingpageReducer.rates,
  currencies: state.landingpageReducer.currencies,
  limits: state.landingpageReducer.limits,
});

const mapDispatchToProps = dispatch => ({
  goHome: () => dispatch(nav.goHome()),
  goSwap: () => dispatch(nav.goSwap()),
  goReverseSwap: () => dispatch(nav.goReverseSwap()),
  goRefund: () => dispatch(nav.goRefund()),
  goFaq: () => dispatch(nav.goFaq()),
  initSwap: state => dispatch(initSwap(state)),
  initReverseSwap: state => dispatch(initReverseSwap(state)),
  getPairs: cb => dispatch(actions.getPairs(cb)),
  getLimits: (rates, cb) => dispatch(actions.getLimits(rates, cb)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
