import { combineReducers } from 'redux';
import swapReducer from "../views/swap/swapReducer";

const rootReducer = combineReducers({
    swapReducer,
}); 

export default rootReducer;
