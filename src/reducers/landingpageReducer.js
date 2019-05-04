import * as actionTypes from '../constants/actions';

const initialState = {
  warnings: [],

  fees: {},
  rates: {},
  limits: {},
  currencies: [],
  errorMessage: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PAIRS_RESPONSE:
      return {
        ...state,

        warnings: action.payload.warnings,

        fees: action.payload.fees,
        rates: action.payload.rates,
        limits: action.payload.limits,
        currencies: action.payload.currencies,

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
