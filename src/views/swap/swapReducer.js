import * as actionTypes from '../../constants/actions';

const initalState = {
  isFetching: false,
  swapInfo: {
    sent: null,
    received: null,
    publicKey: null,
    invoice: null,
  },
  swapResponse: {},
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
    case actionTypes.SET_SWAP_AMOUNT:
      return {
        ...state,
        swapInfo: {
          ...state.swapInfo,
          sent: action.payload.sent,
          received: action.payload.received,
        },
      };
    case actionTypes.SET_SWAP_INVOICE:
      return {
        ...state,
        swapInfo: {
          ...state.swapInfo,
          invoice: action.payload,
        },
      };
    case actionTypes.NEW_KEYS:
      return {
        ...state,
        swapInfo: {
          ...state.swapInfo,
          publicKey: action.payload,
        },
      };
    case actionTypes.COMPLETE_SWAP:
      return initalState;
    default:
      return state;
  }
};

export default reducer;
