import axios from 'axios';
import { ECPair, address, Transaction } from 'bitcoinjs-lib';
import { constructRefundTransaction, detectSwap } from 'boltz-core';
import { boltzApi } from '../../constants';
import * as actionTypes from '../../constants/actions';
import {
  getHexBuffer,
  getNetwork,
  getFeeEstimation,
} from '../../scripts/utils';

const verifyRefundFile = (fileJSON, keys) => {
  const verify = keys.every(key => fileJSON.hasOwnProperty(key));
  return verify;
};

export const completeRefund = () => {
  return {
    type: actionTypes.COMPLETE_REFUND,
  };
};

export const setRefundFile = file => {
  const fileJSON = JSON.parse(file);
  const verifyFile = verifyRefundFile(fileJSON, [
    'currency',
    'redeemScript',
    'privateKey',
    'timeoutBlockHeight',
  ]);
  return {
    type: actionTypes.SET_REFUND_FILE,
    payload: verifyFile ? fileJSON : {},
  };
};

export const setTransactionHash = hash => ({
  type: actionTypes.SET_REFUND_TXHASH,
  payload: hash,
});

export const setDestinationAddress = address => ({
  type: actionTypes.SET_REFUND_DESTINATION,
  payload: address,
});

const setRefundTransactionHash = hash => ({
  type: actionTypes.SET_REFUND_TRANSACTION_HASH,
  payload: hash,
});

export const refundRequest = () => ({
  type: actionTypes.REFUND_REQUEST,
});

export const refundResponse = (success, response) => ({
  type: actionTypes.REFUND_RESPONSE,
  payload: {
    success,
    response,
  },
});

const refundTransaction = (
  refundFile,
  response,
  destinationAddress,
  currency,
  feeEstimation
) => {
  const redeemScript = getHexBuffer(refundFile.redeemScript);
  const lockupTransaction = Transaction.fromHex(response.data.transactionHex);

  // TODO: make sure the provided lockup transaction hash was correct and show more specific error if not
  return constructRefundTransaction(
    [
      {
        redeemScript,
        txHash: lockupTransaction.getHash(),
        keys: ECPair.fromPrivateKey(getHexBuffer(refundFile.privateKey)),
        ...detectSwap(redeemScript, lockupTransaction),
      },
    ],
    address.toOutputScript(destinationAddress, getNetwork(currency)),
    refundFile.timeoutBlockHeight,
    feeEstimation[currency]
  );
};

export const startRefund = (
  refundFile,
  transactionHash,
  destinationAddress,
  cb
) => {
  const url = `${boltzApi}/gettransaction`;
  const currency = refundFile.currency;

  return dispatch => {
    dispatch(refundRequest());
    axios
      .post(url, {
        currency,
        transactionHash,
      })
      .then(response => {
        dispatch(
          getFeeEstimation(feeEstimation => {
            const transaction = refundTransaction(
              refundFile,
              response,
              destinationAddress,
              currency,
              feeEstimation
            );

            dispatch(setRefundTransactionHash(transaction.getId()));
            dispatch(
              broadcastRefund(currency, transaction.toHex(), () => {
                dispatch(refundResponse(true, response.data));

                cb();
              })
            );
          })
        );
      })
      .catch(error => {
        const message = error.response.data.error;

        window.alert(`Failed to refund swap: ${message}`);
        dispatch(refundResponse(false, message));
      });
  };
};

const broadcastRefund = (currency, refundTransaction, cb) => {
  const url = `${boltzApi}/broadcasttransaction`;
  return dispatch => {
    dispatch(refundRequest());
    axios
      .post(url, {
        currency,
        transactionHex: refundTransaction,
      })
      .then(() => cb())
      .catch(error => {
        const message = error.response.data.error;

        window.alert(`Failed to broadcast refund transaction: ${message}`);
        dispatch(refundResponse(false, message));
      });
  };
};
