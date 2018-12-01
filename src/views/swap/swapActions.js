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
  let url = 'http://localhost:9001/createswap';
  return dispatch => {
    dispatch(swapRequest());
    axios
      .post(url, {
        pairId: 'LTC/BTC',
        orderSide: 0,
        invoice:
          'lnsb100u1pdlmsvqpp5000a3938aue8mhy8zq947ht8slwk5n5s7z5rpg79lqt6p3cs5x9sdqqcqzysefcuqwzq20ye8d0g4xfr8xap2geuq4lm9kmqxadweyxl2wn8arh8snhey5nf0w33ym60urgrnwu65q46s7z94lsvdxct639lq0azvjspazg6g4',
        refundPublicKey:
          '03340f197bbe3664dcddefcd05ce49371f8d30ed31a6ca36e60abb887fbf66da20',
      })
      .then(response => dispatch(swapResponse(true, response)))
      .catch(error => {
        alert('Failed to execute swap.');
        dispatch(swapResponse(false, error));
      });
  };
};

export const startSwapDemo = () => {
  return dispatch => {
    dispatch(swapRequest());
    setTimeout(() => dispatch(swapResponse(true, {})), 1000);
  };
};
