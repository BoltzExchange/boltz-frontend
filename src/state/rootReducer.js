import { combineReducers } from 'redux';
import swapReducer from '../views/swap/swapReducer';
import refundReducer from '../views/refund/refundReducer';

const rootReducer = combineReducers({
  swapReducer,
  refundReducer,
});

export default rootReducer;
