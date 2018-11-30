import { combineReducers } from 'redux';
import swapReducer from '../views/swap/swapReducer';
import navReducer from '../views/root/navReducer';
import refundReducer from '../views/refund/refundReducer';

const createRootReducer = () =>
  combineReducers({
    route: navReducer,
    swapReducer,
    refundReducer,
  });

export default createRootReducer;
