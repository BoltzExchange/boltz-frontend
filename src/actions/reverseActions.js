import axios from 'axios';
import EventSource from 'eventsource';
import { Transaction, ECPair, address } from 'bitcoinjs-lib';
import { detectSwap, constructClaimTransaction } from 'boltz-core';
import * as actionTypes from '../constants/actions';
import { boltzApi, SwapUpdateEvent } from '../constants';
import {
  toSatoshi,
  getNetwork,
  getHexBuffer,
  getFeeEstimation,
} from '../utils';

let latestSwapEvent = '';

export const initReverseSwap = state => ({
  type: actionTypes.INIT_REVERSE_SWAP,
  payload: {
    webln: state.webln,
    base: state.base,
    quote: state.quote,
    baseAmount: state.baseAmount,
    quoteAmount: state.quoteAmount,
    keys: state.keys,
    pair: state.pair,
    preimage: state.preimage,
    preimageHash: state.preimageHash,
  },
});

export const completeReverseSwap = () => ({
  type: actionTypes.COMPLETE_REVERSE_SWAP,
});

export const setReverseSwapAddress = (address, error) => ({
  type: actionTypes.SET_REVERSE_SWAP_ADDRESS,
  payload: {
    address,
    error,
  },
});

export const setReverseSwapStatus = status => ({
  type: actionTypes.SET_REVERSE_SWAP_STATUS,
  payload: status,
});

export const reverseSwapRequest = () => ({
  type: actionTypes.REVERSE_SWAP_REQUEST,
});

export const reverseSwapResponse = (success, response) => ({
  type: actionTypes.REVERSE_SWAP_RESPONSE,
  payload: {
    success,
    response,
  },
});

export const setIsReconnecting = isReconnecting => ({
  type: actionTypes.SET_IS_RECONNECTING,
  payload: isReconnecting,
});

export const startReverseSwap = (swapInfo, nextStage, timelockExpired) => {
  const url = `${boltzApi}/createswap`;
  const { pair, keys, baseAmount } = swapInfo;

  const amount = toSatoshi(Number.parseFloat(baseAmount));

  return dispatch => {
    dispatch(reverseSwapRequest());
    axios
      .post(url, {
        type: 'reversesubmarine',
        pairId: pair.id,
        invoiceAmount: amount,
        orderSide: pair.orderSide,
        claimPublicKey: keys.publicKey,
        preimageHash: swapInfo.preimageHash,
      })
      .then(response => {
        dispatch(reverseSwapResponse(true, response.data));

        // To set "isFetching" to true
        dispatch(reverseSwapRequest());
        startListening(
          dispatch,
          swapInfo,
          response.data,
          nextStage,
          timelockExpired
        );
      })
      .catch(error => {
        const message = error.response.data.error;
        dispatch(reverseSwapResponse(false, message));
      });
  };
};

export const claimSwap = (dispatch, nextStage, swapInfo, swapResponse) => {
  dispatch(
    getFeeEstimation(feeEstimation => {
      const claimTransaction = getClaimTransaction(
        swapInfo,
        swapResponse,
        feeEstimation
      );

      dispatch(
        broadcastClaimTransaction(
          swapInfo.quote,
          claimTransaction.toHex(),
          () => {
            dispatch(reverseSwapResponse(true, swapResponse));
            nextStage();
          }
        )
      );
    })
  );
};

const getClaimTransaction = (swapInfo, response, feeEstimation) => {
  const redeemScript = getHexBuffer(response.redeemScript);
  const lockupTransaction = Transaction.fromHex(response.transactionHex);

  return constructClaimTransaction(
    [
      {
        ...detectSwap(redeemScript, lockupTransaction),
        redeemScript,
        txHash: lockupTransaction.getHash(),
        preimage: getHexBuffer(swapInfo.preimage),
        keys: ECPair.fromPrivateKey(getHexBuffer(swapInfo.keys.privateKey)),
      },
    ],
    address.toOutputScript(swapInfo.address, getNetwork(swapInfo.quote)),
    feeEstimation[swapInfo.quote],
    false
  );
};

const broadcastClaimTransaction = (currency, claimTransaction, cb) => {
  const url = `${boltzApi}/broadcasttransaction`;
  return dispatch => {
    axios
      .post(url, {
        currency,
        transactionHex: claimTransaction,
      })
      .then(() => cb())
      .catch(error => {
        const message = error.response.data.error;

        window.alert(`Failed to broadcast claim transaction: ${message}`);
        dispatch(reverseSwapResponse(false, message));
      });
  };
};

const handleReverseSwapStatus = (
  data,
  source,
  dispatch,
  nextStage,
  timelockExpired,
  swapInfo,
  response
) => {
  const status = data.status;

  // If this function is called with the data from the GET endpoint "/swapstatus"
  // it could be that the received status has already been handled
  if (status === latestSwapEvent) {
    return;
  } else {
    latestSwapEvent = status;
  }

  switch (status) {
    case SwapUpdateEvent.TransactionMempool:
      console.log(data);
      dispatch(
        reverseSwapResponse(true, {
          transactionId: data.transaction.id,
          transactionHex: data.transaction.hex,
        })
      );

      nextStage();
      break;

    case SwapUpdateEvent.TransactionConfirmed:
      source.close();

      claimSwap(dispatch, nextStage, swapInfo, {
        ...response,
        transactionId: data.transaction.id,
        transactionHex: data.transaction.hex,
      });
      break;

    case SwapUpdateEvent.SwapExpired:
    case SwapUpdateEvent.TransactionRefunded:
      source.close();
      dispatch(timelockExpired());

      break;

    case SwapUpdateEvent.TransactionFailed:
      source.close();
      dispatch(setReverseSwapStatus('Could not send onchain coins'));
      dispatch(reverseSwapResponse(false, {}));
      break;

    default:
      console.log(`Unknown swap status: ${JSON.stringify(data)}`);
      break;
  }
};

const startListening = (
  dispatch,
  swapInfo,
  response,
  nextStage,
  timelockExpired
) => {
  const source = new EventSource(
    `${boltzApi}/streamswapstatus?id=${response.id}`
  );

  source.onerror = () => {
    source.close();

    dispatch(setIsReconnecting(true));

    console.log(`Lost connection to Boltz`);
    const url = `${boltzApi}/swapstatus`;

    const interval = setInterval(() => {
      axios
        .post(url, {
          id: response.id,
        })
        .then(statusReponse => {
          dispatch(setIsReconnecting(false));
          clearInterval(interval);

          console.log(`Reconnected to Boltz`);

          startListening(
            dispatch,
            swapInfo,
            response,
            nextStage,
            timelockExpired
          );

          handleReverseSwapStatus(
            statusReponse.data,
            source,
            dispatch,
            nextStage,
            timelockExpired,
            swapInfo,
            response
          );
        });
    }, 1000);
  };

  source.onmessage = event => {
    handleReverseSwapStatus(
      JSON.parse(event.data),
      source,
      dispatch,
      nextStage,
      timelockExpired,
      swapInfo,
      response
    );
  };
};
