import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, preset, jss } from 'react-jss';
import store from '../state';
import theme from '../constants/theme';

import Router from '../views/router';

jss.setup(preset);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
