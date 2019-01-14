import axios from 'axios';
import EventSource from 'eventsource';
import { boltzApi } from '../../constants';
import * as actionTypes from '../../constants/actions';

export const completeSwap = () => {
  return {
    type: actionTypes.COMPLETE_SWAP,
  };
};

export const initSwap = state => ({
  type: actionTypes.INIT_SWAP,
  payload: {
    base: state.base,
    quote: state.quote,
    baseAmount: state.baseAmount,
    quoteAmount: state.quoteAmount,
    keys: state.keys,
    pair: state.pair,
  },
});

export const setSwapInvoice = invoice => ({
  type: actionTypes.SET_SWAP_INVOICE,
  payload: invoice,
});

export const setSwapStatus = status => ({
  type: actionTypes.SET_SWAP_STATUS,
  payload: status,
});

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
  const url = `${boltzApi}/createswap`;
  const { pair, invoice, keys } = swapInfo;

  return dispatch => {
    dispatch(swapRequest());
    axios
      .post(url, {
        pairId: pair.id,
        orderSide: pair.orderSide,
        invoice: invoice,
        refundPublicKey: keys.publicKey,
      })
      .then(response => {
        dispatch(swapResponse(true, response.data));
        startListening(dispatch, response.data.id, cb);
        cb();
      })
      .catch(error => {
        window.alert('Failed to execute swap');
        dispatch(swapResponse(false, error.data));
      });
  };
};

export const startListening = (dispatch, swapId, callback) => {
  const source = new EventSource(`${boltzApi}/swapstatus?id=${swapId}`);

  let message = {
    pending: true,
    message: 'Waiting for one confirmation...',
  };

  dispatch(setSwapStatus(message));

  source.onmessage = event => {
    const data = JSON.parse(event.data);

    if (data.message.startsWith('Transaction confirmed:')) {
      message = {
        pending: false,
        message: 'Confirmed!',
      };
      source.close();
      callback();
    } else {
      message = {
        error: true,
        pending: true,
        message: 'Boltz failed to confirm the trasnsaction',
      };
    }

    dispatch(setSwapStatus(message));
  };
};
