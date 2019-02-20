import * as actionTypes from '../../constants/actions';

const initalState = {
  webln: null,
  isFetching: false,
  swapInfo: {
    base: null,
    quote: null,
    baseAmount: null,
    quoteAmount: null,
    keys: null,
    pair: null,
    address: null,
  },
  swapResponse: {
    success: true,
  },
  swapStatus: 'Waiting for confirmation...',
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.REVERSE_SWAP_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.REVERSE_SWAP_RESPONSE:
      return {
        ...state,
        isFetching: false,
        swapResponse: action.payload,
      };

    case actionTypes.INIT_REVERSE_SWAP:
      return {
        ...state,
        webln: action.payload.webln,
        swapInfo: {
          ...state.swapInfo,
          base: action.payload.base,
          quote: action.payload.quote,
          baseAmount: action.payload.baseAmount,
          quoteAmount: action.payload.quoteAmount,
          keys: action.payload.keys,
          pair: action.payload.pair,
        },
      };

    case actionTypes.SET_REVERSE_SWAP_ADDRESS:
      return {
        ...state,
        swapInfo: {
          ...state.swapInfo,
          address: action.payload,
        },
      };

    case actionTypes.SET_REVERSE_SWAP_STATUS:
      return {
        ...state,
        swapStatus: action.payload,
      };

    case actionTypes.COMPLETE_REVERSE_SWAP:
      return initalState;

    default:
      return state;
  }
};

export default reducer;
