import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, preset, jss } from 'react-jss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from '../state';
import theme from '../constants/theme';
import Container from '../components/container';

import LandingPage from '../views/landingPage';
import Swap from '../views/swap';
import Refund from '../views/refund';

jss.setup(preset);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <Container>
              <Route exact path={'/'} component={LandingPage} />
              <Route exact path={'/swap'} component={Swap} />
              <Route exact path={'/refund'} component={Refund} />
              <Route exact path={'/catalog'} />
            </Container>
          </ThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
