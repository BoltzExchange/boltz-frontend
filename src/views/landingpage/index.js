import { connect } from 'react-redux';
import LandingPage from './landingpage';
import { initSwap } from '../swap/swapActions';
import * as actions from './landingpageActions';
import { initReverseSwap } from '../reverse/reverseActions';

const mapStateToProps = state => ({
  fees: state.landingpageReducer.fees,
  rates: state.landingpageReducer.rates,
  limits: state.landingpageReducer.limits,
  currencies: state.landingpageReducer.currencies,
  errorMessage: state.landingpageReducer.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  initSwap: state => dispatch(initSwap(state)),
  initReverseSwap: state => dispatch(initReverseSwap(state)),
  getPairs: () => dispatch(actions.getPairs()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
