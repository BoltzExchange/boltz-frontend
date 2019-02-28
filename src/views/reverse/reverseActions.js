import axios from 'axios';
import EventSource from 'eventsource';
import { Transaction, ECPair, address } from 'bitcoinjs-lib';
import { detectSwap, constructClaimTransaction } from 'boltz-core';
import { boltzApi } from '../../constants';
import * as actionTypes from '../../constants/actions';
import {
  toSatoshi,
  getHexBuffer,
  getNetwork,
  getFeeEstimation,
} from '../../scripts/utils';

let latestSwapStatus = '';

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
  },
});

export const completeReverseSwap = () => ({
  type: actionTypes.COMPLETE_REVERSE_SWAP,
});

export const setReverseSwapAddress = address => ({
  type: actionTypes.SET_REVERSE_SWAP_ADDRESS,
  payload: address,
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

const setIsReconnecting = isReconnecting => ({
  type: actionTypes.SET_IS_RECONNECTING,
  payload: isReconnecting,
});

export const startReverseSwap = (swapInfo, nextStage, timelockExpired) => {
  const url = `${boltzApi}/createreverseswap`;
  const { pair, keys, baseAmount } = swapInfo;

  const amount = toSatoshi(Number.parseFloat(baseAmount));

  return dispatch => {
    dispatch(reverseSwapRequest());
    axios
      .post(url, {
        amount,
        pairId: pair.id,
        orderSide: pair.orderSide,
        claimPublicKey: keys.publicKey,
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

        window.alert(`Failed to execute reverse swap: ${message}`);
        dispatch(reverseSwapResponse(false, message));
      });
  };
};

const claimTransaction = (swapInfo, response, preimage, feeEstimation) => {
  const redeemScript = getHexBuffer(response.redeemScript);
  const lockupTransaction = Transaction.fromHex(response.lockupTransaction);

  return constructClaimTransaction(
    [
      {
        ...detectSwap(redeemScript, lockupTransaction),
        redeemScript,
        preimage: Buffer.from(preimage, 'base64'),
        txHash: lockupTransaction.getHash(),
        keys: ECPair.fromPrivateKey(getHexBuffer(swapInfo.keys.privateKey)),
      },
    ],
    address.toOutputScript(swapInfo.address, getNetwork(swapInfo.quote)),
    feeEstimation[swapInfo.quote],
    false
  );
};

const handleSwapStatus = (
  data,
  source,
  dispatch,
  nextStage,
  timelockExpired,
  swapInfo,
  response
) => {
  const message = data.message;

  if (message === latestSwapStatus) {
    return;
  } else {
    latestSwapStatus = message;
  }

  if (message.startsWith('Transaction confirmed')) {
    dispatch(setReverseSwapStatus('Waiting for invoice to be paid...'));
    nextStage();
  } else if (data.message.startsWith('Refunded lockup transaction')) {
    source.close();
    dispatch(timelockExpired());
  } else if (!message.startsWith('Could not find swap with id')) {
    source.close();
    dispatch(
      getFeeEstimation(feeEstimation => {
        const claimTx = claimTransaction(
          swapInfo,
          response,
          data.preimage,
          feeEstimation
        );
        dispatch(
          broadcastClaim(swapInfo.quote, claimTx.toHex(), () => {
            dispatch(reverseSwapResponse(true, response));
            nextStage();
          })
        );
      })
    );
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

          handleSwapStatus(
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
    handleSwapStatus(
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

const broadcastClaim = (currency, claimTransaction, cb) => {
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
