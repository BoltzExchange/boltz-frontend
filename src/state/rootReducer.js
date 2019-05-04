import { combineReducers } from 'redux';
import swapReducer from '../reducers/swapReducer';
import reverseSwapReducer from '../reducers/reverseReducer';
import landingpageReducer from '../reducers/landingpageReducer';
import refundReducer from '../reducers/refundReducer';
import datastorageReducer from '../reducers/datastorageReducer';

const createRootReducer = () =>
  combineReducers({
    landingpageReducer,
    swapReducer,
    reverseSwapReducer,
    refundReducer,
    dataStorage: datastorageReducer,
  });

export default createRootReducer;
