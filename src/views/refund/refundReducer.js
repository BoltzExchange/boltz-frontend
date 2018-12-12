import * as actionTypes from '../../constants/actions';

const initalState = {
  refundFile: {},
  transactionHash: null,
  destinationAddress: null,
  refundTransaction: null,
  refundTransactionHash: null,
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.SET_REFUND_FILE:
      return {
        ...state,
        refundFile: action.payload,
      };

    case actionTypes.SET_REFUND_TXHASH:
      return {
        ...state,
        transactionHash: action.payload,
      };

    case actionTypes.SET_REFUND_DESTINATION:
      return {
        ...state,
        destinationAddress: action.payload,
      };

    case actionTypes.SET_REFUND_TRANSACTION:
      return {
        ...state,
        refundTransaction: action.payload,
      };

    case actionTypes.SET_REFUND_TRANSACTION_HASH:
      return {
        ...state,
        refundTransactionHash: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
