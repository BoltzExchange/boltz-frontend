import axios from 'axios';
import { generateKeys } from '../../action';
import * as actionTypes from '../../constants/actions';

export const completeSwap = () => {
  generateKeys.clearKeys();
  return {
    type: actionTypes.COMPLETE_SWAP,
  };
};

/**
 * @param sent amount sent
 * @param received amount received
 */
export const setSwapAmount = (sent, received) => ({
  type: actionTypes.SET_SWAP_AMOUNT,
  payload: {
    sent,
    received,
  },
});

/**
 * @param invoice swap invoice
 */
export const setSwapInvoice = invoice => ({
  type: actionTypes.SET_SWAP_INVOICE,
  payload: invoice,
});

/**
 * @param {boolean} success
 * @param {object} response
 */
export const swapResponse = (success, response) => ({
  type: actionTypes.SWAP_RESPONSE,
  payload: {
    success,
    response,
  },
});

export const swapRequest = () => ({
  type: actionTypes.SWAP_REQUEST,
});

export const startSwap = (swapInfo, cb) => {
  const url = 'http://localhost:9001/createswap';
  return dispatch => {
    dispatch(swapRequest());
    axios
      .post(url, {
        pairId: 'LTC/BTC',
        orderSide: 0,
        invoice: swapInfo.invoice,
        refundPublicKey: swapInfo.publicKey,
      })
      .then(response => {
        window.alert('got it');
        console.log(response.data);
        dispatch(swapResponse(true, response.data));
      })
      .then(() => cb())
      .catch(error => {
        window.alert('Failed to execute swap.');
        dispatch(swapResponse(false, error.data));
      });
  };
};

export const startSwapDemo = () => {
  return dispatch => {
    dispatch(swapRequest());
    setTimeout(() => dispatch(swapResponse(true, {})), 1000);
  };
};
