import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
// import * as routes from '../../constants/routes';
import Container from '../../components/container';
// import ReverseSwapTimelockExpired from '../reversetimelock';
import history from '../../constants/history';

const LandingPage = lazy(() => import('../landingpage'));
const Faq = lazy(() => import('../faq'));
const Swap = lazy(() => import('../swap'));
const Refund = lazy(() => import('../refund'));
const ReverseSwap = lazy(() => import('../reverse'));

const AppRouter = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Container>
            <Route exact path={'/'} component={LandingPage} />
            <Route exact path={'/faq'} component={Faq} />
            <Route exact path={'/swap'} component={Swap} />
            <Route component={LandingPage} />
          </Container>
        </Switch>
      </Suspense>
    </Router>
  );
};

AppRouter.propTypes = {
  route: PropTypes.string.isRequired,
};

export default AppRouter;
