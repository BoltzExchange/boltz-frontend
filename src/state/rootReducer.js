import { combineReducers } from 'redux';
import swapReducer from '../views/swap/swapReducer';
import landingpageReducer from '../views/landingpage/landingpageReducer';
import routerReducer from '../views/router/routerReducer';
import refundReducer from '../views/refund/refundReducer';

const createRootReducer = () =>
  combineReducers({
    route: routerReducer,
    landingpageReducer,
    swapReducer,
    refundReducer,
  });

export default createRootReducer;
