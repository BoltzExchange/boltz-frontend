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
    invoice: null,
  },
  swapResponse: {},
  swapStatus: {
    error: false,
    pending: false,
    message: 'Waiting for one confirmation...',
  },
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.SWAP_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.SWAP_RESPONSE:
      return {
        ...state,
        isFetching: false,
        swapResponse: action.payload,
      };

    case actionTypes.INIT_SWAP:
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

    case actionTypes.SET_SWAP_INVOICE:
      return {
        ...state,
        swapInfo: {
          ...state.swapInfo,
          invoice: action.payload.invoice,
        },
        swapStatus: {
          ...state.swapStatus,
          error: action.payload.error,
        },
      };

    case actionTypes.SET_SWAP_STATUS:
      return {
        ...state,
        swapStatus: {
          ...state.swapStatus,
          ...action.payload,
        },
      };

    case actionTypes.COMPLETE_SWAP:
      return { ...initalState };

    default:
      return state;
  }
};

export default reducer;
