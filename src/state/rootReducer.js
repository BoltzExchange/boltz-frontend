import { combineReducers } from 'redux';
import swapReducer from '../views/swap/swapReducer';
import reverseSwapReducer from '../views/reverse/reverseReducer';
import landingpageReducer from '../reducers/landingpageReducer';
import refundReducer from '../views/refund/refundReducer';

const createRootReducer = () =>
  combineReducers({
    landingpageReducer,
    swapReducer,
    reverseSwapReducer,
    refundReducer,
  });

export default createRootReducer;
