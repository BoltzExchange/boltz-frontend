import * as actionTypes from '../../constants/actions';

const initialState = {
  rates: {},
  currencies: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PAIRS_RESPONSE:
      return {
        ...state,
        rates: action.payload.rates,
        currencies: action.payload.currencies,
      };

    default:
      return state;
  }
};

export default reducer;
