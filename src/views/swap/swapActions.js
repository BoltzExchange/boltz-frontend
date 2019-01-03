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
  return dispatch => {
    const { pair, invoice, keys } = swapInfo;

    console.log({
      pairId: pair.id,
      orderSide: pair.orderSide,
      invoice: invoice,
      refundPublicKey: keys.publicKey,
    });

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
        startListening(dispatch, response.data.id);

        cb();
      })
      .catch(error => {
        window.alert('Failed to execute swap');
        console.log(error);
        dispatch(swapResponse(false, error.data));
      });
  };
};

export const startListening = (dispatch, swapId) => {
  const source = new EventSource(`${boltzApi}/swapstatus?id=${swapId}`);

  source.onmessage = event => {
    const data = JSON.parse(event.data);

    let message = 'Paying Lightning invoice...';

    if (data.message.startsWith('Invoice paid:')) {
      message = 'Done';
      source.close();
    }

    dispatch(setSwapStatus(message));
  };
};
