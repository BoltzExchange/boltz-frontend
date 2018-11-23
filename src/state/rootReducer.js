import { combineReducers } from 'redux';
import swapReducer from '../views/landingPage/landingPageReducer';
import refundReducer from '../views/refund/refundReducer';

const rootReducer = combineReducers({
  swapReducer,
  refundReducer,
});

export default rootReducer;
