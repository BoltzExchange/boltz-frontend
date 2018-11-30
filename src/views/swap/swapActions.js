import * as actionTypes from '../../constants/actions';
import axios from 'axios';

export const toggleSwapMode = () => ({
  type: actionTypes.TOGGLE_SWAP_MODE,
});

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

export const startSwap = () => {
  let url = 'https://127.0.0.1:9001/createswap';
  return dispatch => {
    dispatch(swapRequest());
    axios
      .get(url)
      .then(response => dispatch(swapResponse(true, response)))
      .catch(response => dispatch(swapResponse(false, response)));
  };
};
