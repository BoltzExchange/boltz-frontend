import axios from 'axios';
import EventSource from 'eventsource';
import { boltzApi, SwapUpdateEvent } from '../constants';
import * as actionTypes from '../constants/actions';

export const completeSwap = () => {
  return {
    type: actionTypes.COMPLETE_SWAP,
  };
};

export const initSwap = state => ({
  type: actionTypes.INIT_SWAP,
  payload: {
    webln: state.webln,
    base: state.base,
    quote: state.quote,
    baseAmount: state.baseAmount,
    quoteAmount: state.quoteAmount,
    keys: state.keys,
    pair: state.pair,
  },
});

export const setSwapInvoice = (invoice, error) => ({
  type: actionTypes.SET_SWAP_INVOICE,
  payload: {
    invoice,
    error,
  },
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
        const message = error.response.data.error;

        window.alert(`Failed to execute swap: ${message}`);
        dispatch(swapResponse(false, message));
      });
  };
};

const handleSwapStatus = (data, source, dispatch, callback) => {
  const event = data.event;

  switch (event) {
    case SwapUpdateEvent.TransactionConfirmed:
      dispatch(
        setSwapStatus({
          pending: true,
          message: 'Waiting for invoice to be paid...',
        })
      );
      break;

    case SwapUpdateEvent.InvoiceFailedToPay:
      source.close();
      dispatch(
        setSwapStatus({
          error: true,
          pending: false,
          message: 'Could not pay invoice. Please refund your coins.',
        })
      );
      break;

    case SwapUpdateEvent.InvoicePaid:
      source.close();
      callback();
      break;

    default:
      console.log(`Unknown swap status: ${JSON.stringify(data)}`);
      break;
  }
};

export const startListening = (dispatch, swapId, callback) => {
  const source = new EventSource(`${boltzApi}/streamswapstatus?id=${swapId}`);

  dispatch(
    setSwapStatus({
      pending: true,
      message: 'Waiting for one confirmation...',
    })
  );

  source.onerror = () => {
    source.close();

    console.log(`Lost connection to Boltz`);
    const url = `${boltzApi}/swapstatus`;

    const interval = setInterval(() => {
      axios
        .post(url, {
          id: swapId,
        })
        .then(statusReponse => {
          clearInterval(interval);

          console.log(`Reconnected to Boltz`);

          startListening(dispatch, swapId, callback);
          handleSwapStatus(statusReponse.data, source, dispatch, callback);
        });
    }, 1000);
  };

  source.onmessage = event => {
    handleSwapStatus(JSON.parse(event.data), source, dispatch, callback);
  };
};
