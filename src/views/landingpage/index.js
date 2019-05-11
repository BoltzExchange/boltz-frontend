import React, { lazy } from 'react';
import { connect } from 'react-redux';
import PlatformSelector from '../../hoc/platformSelector';
import { initSwap } from '../../actions/swapActions';
import * as actions from '../../actions/landingPageActions';
import { initReverseSwap } from '../../actions/reverseActions';

const LandingPageDesktop = lazy(() => import('./landingPageDesktop'));
const LandingPageMobile = lazy(() => import('./landingPageMobile'));

const LandingPage = props => (
  <PlatformSelector
    mobile={<LandingPageMobile {...props} />}
    desktop={<LandingPageDesktop {...props} />}
  />
);

const mapStateToProps = state => ({
  warnings: state.landingpageReducer.warnings,
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
