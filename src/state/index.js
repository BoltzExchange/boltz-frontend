import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from './rootReducer';
import logger from 'redux-logger';

// Check if we are in production
const notProduction = process.env.NODE_ENV !== 'production';

// If we are in production dont use devtools-extension-compose
const composeEnhancers =
  notProduction && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'boltz',
        actionsBlacklist: ['REDUX_STORAGE_SAVE'],
        serialize: true,
        trace: true,
      })
    : compose;

// Select middelware to use
let middelware = [thunk];

if (notProduction) {
  middelware = [...middelware, logger];
}

const enhancer = composeEnhancers(applyMiddleware(...middelware));
const rootReducer = createRootReducer();
const store = createStore(rootReducer, enhancer);

export default store;
