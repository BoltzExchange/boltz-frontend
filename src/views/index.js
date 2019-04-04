import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, preset, jss } from 'react-jss';
import store from '../state';
import theme from '../constants/theme';
import AppRouter from '../views/router';
import 'react-notifications-component/dist/theme.css';

jss.setup(preset);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
