import * as actionTypes from '../../constants/actions';
import axios from 'axios';

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

export const startSwap = () => {
  const url = 'http://localhost:9001/createswap';
  return dispatch => {
    dispatch(swapRequest());
    axios
      .post(url, {
        pairId: 'LTC/BTC',
        orderSide: 0,
        invoice:
          'lnsb100u1pdlmsvqpp5000a3938aue8mhy8zq947ht8slwk5n5s7z5rpg79' +
          'lqt6p3cs5x9sdqqcqzysefcuqwzq20ye8d0g4xfr8xap2geuq4lm9kmqxadweyxl2wn8a' +
          'rh8snhey5nf0w33ym60urgrnwu65q46s7z94lsvdxct639lq0azvjspazg6g4',
        refundPublicKey:
          '03340f197bbe3664dcddefcd05ce49371f8d30ed31a6ca36e60abb887fbf66da20',
      })
      .then(response => {
        window.alert('got it');
        console.log(response.data);
        dispatch(swapResponse(true, response));
      })
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
