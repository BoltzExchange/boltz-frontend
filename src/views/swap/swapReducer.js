import * as actionTypes from '../../constants/actions';

const initalState = {
  inSwapMode: false,
  swapInfo: {
    sent: null,
    received: null,
  },
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.ENTER_SWAP_MODE:
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
    default:
      return state;
  }
};

export default reducer;
