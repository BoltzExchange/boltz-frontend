import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from './rootReducer';

import logger from 'redux-logger';

const store = createStore(
  createRootReducer(),
  compose(applyMiddleware(logger, thunk))
);

export default store;
