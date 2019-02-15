import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from './rootReducer';
import logger from 'redux-logger';

let middelware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middelware = [...middelware, logger];
}

const store = createStore(
  createRootReducer(),
  compose(applyMiddleware(...middelware))
);

export default store;
