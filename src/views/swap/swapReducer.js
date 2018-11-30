import * as actionTypes from '../../constants/actions';

const initalState = {
  inSwapMode: false,
  isFetching: false,
  swapInfo: {
    sent: null,
    received: null,
  },
  swapResponse: null,
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SWAP_MODE:
      return {
        ...state,
        inSwapMode: !state.inSwapMode,
      };
    case actionTypes.SET_SWAP_AMOUNT:
      return {
        ...state,
        swapInfo: {
          sent: action.payload.sent,
          received: action.payload.received,
        },
      };
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
    default:
      return state;
  }
};

export default reducer;
