import * as actionTypes from '../../constants/actions';

const initalState = {
  inRefundMode: false,
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.ENTER_REFUND_MODE:
      return {
        ...state,
        inRefundMode: !state.inRefundMode,
      };
    default:
      return state;
  }
};

export default reducer;
