import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import swapReducer from '../views/swap/swapReducer';
import refundReducer from '../views/refund/refundReducer';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    swapReducer,
    refundReducer,
  });

export default createRootReducer;
