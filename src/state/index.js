import { applyMiddleware, createStore, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './rootReducer';

import logger from 'redux-logger';

const history = createBrowserHistory();

const store = createStore(
  createRootReducer(history),
  compose(applyMiddleware(logger, routerMiddleware(history)))
);

export { history };
export default store;
