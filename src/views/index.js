import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, preset, jss } from 'react-jss';
import store from '../state';
import theme from '../constants/theme';
import 'react-notifications-component/dist/theme.css';
import { Router, Route, Switch } from 'react-router-dom';
import * as routes from '../constants/routes';
import Container from '../components/container';
import BackGround from '../components/background';
import history from '../constants/history';

const LandingPage = lazy(() => import('./landingpage'));
const Faq = lazy(() => import('./faq'));
const Swap = lazy(() => import('./swap'));
const Refund = lazy(() => import('./refund'));
const ReverseSwap = lazy(() => import('./reverse'));

jss.setup(preset);
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Suspense fallback={<BackGround showFooter={false} />}>
            <Switch>
              <Container>
                <Route exact path={routes.home} component={LandingPage} />
                <Route exact path={routes.faq} component={Faq} />
                <Route exact path={routes.swap} component={Swap} />
                <Route exact path={routes.refund} component={Refund} />
                <Route
                  exact
                  path={routes.reverseSwap}
                  component={ReverseSwap}
                />
              </Container>
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
