import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, preset, jss } from 'react-jss';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from '../state';
import theme from '../constants/theme';
import Container from '../components/container';

import Swap from '../views/swap';
import Refund from '../views/refund';

jss.setup(preset);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <Container>
              <Switch>
                <Route exact path={'/'} component={Swap} />
                <Route exact path={'/refund'} component={Refund} />
                <Route exact path={'/catalog'} />
              </Switch>
            </Container>
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
