import { combineReducers } from 'redux';
import swapReducer from '../views/swap/swapReducer';
import routerReducer from '../views/root/routerReducer';
import refundReducer from '../views/refund/refundReducer';

const createRootReducer = () =>
  combineReducers({
    route: routerReducer,
    swapReducer,
    refundReducer,
  });

export default createRootReducer;
