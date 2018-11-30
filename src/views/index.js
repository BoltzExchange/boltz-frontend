import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, preset, jss } from 'react-jss';
import store from '../state';
import theme from '../constants/theme';

import Root from '../views/root';

jss.setup(preset);
console.log(store.getState());
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Root />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
