import * as actionTypes from '../../constants/actions';

const initialState = {
  rates: {},
  currencies: [],
  limits: {},
  errorMessage: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PAIRS_RESPONSE:
      return {
        ...state,
        rates: action.payload.rates,
        errorMessage: undefined,
        currencies: action.payload.currencies,
      };

    case actionTypes.LIMITS_RESPONSE:
      return {
        ...state,
        limits: action.payload,
        errorMessage: undefined,
      };
    case actionTypes.RESOURCE_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
