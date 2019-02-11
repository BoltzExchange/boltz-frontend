import * as actionTypes from '../../constants/actions';

const initialState = {
  rates: {},
  currencies: [],
  limits: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PAIRS_RESPONSE:
      return {
        ...state,
        rates: action.payload.rates,
        currencies: action.payload.currencies,
      };

    case actionTypes.LIMITS_RESPONSE:
      return {
        ...state,
        limits: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
