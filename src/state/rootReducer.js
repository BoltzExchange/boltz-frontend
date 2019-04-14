import { combineReducers } from 'redux';
import swapReducer from '../reducers/swapReducer';
import reverseSwapReducer from '../reducers/reverseReducer';
import landingpageReducer from '../reducers/landingpageReducer';
import refundReducer from '../reducers/refundReducer';

const createRootReducer = () =>
  combineReducers({
    landingpageReducer,
    swapReducer,
    reverseSwapReducer,
    refundReducer,
  });

export default createRootReducer;
