import * as actionTypes from '../constants/actions';

export const initialState = {
  id: '',
  asset: '',
  amount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ID:
      return {
        ...state,
        id: action.payload,
      };

    case actionTypes.SET_ASSET:
      return {
        ...state,
        asset: action.payload.asset,
        amount: action.payload.amount,
      };
    case actionTypes.CLEAR_DATA_STORAGE:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
