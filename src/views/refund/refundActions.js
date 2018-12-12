import axios from 'axios';
import { ECPair, address, Transaction } from 'bitcoinjs-lib';
import { Networks, constructRefundTransaction, detectSwap } from 'boltz-core';
import * as actionTypes from '../../constants/actions';
import { boltzApi } from '../../constants';
import { getHexBuffer } from '../../scripts/utils';

export const setRefundFile = file => ({
  type: actionTypes.SET_REFUND_FILE,
  payload: JSON.parse(file),
});

export const setTransactionHash = hash => ({
  type: actionTypes.SET_REFUND_TXHASH,
  payload: hash,
});

export const setDestinationAddress = address => ({
  type: actionTypes.SET_REFUND_DESTINATION,
  payload: address,
});

const setRefundTransaction = transaction => ({
  type: actionTypes.SET_REFUND_TRANSACTION,
  payload: transaction,
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
        const redeemScript = getHexBuffer(refundFile.redeemScript);
        const lockupTransaction = Transaction.fromHex(
          response.data.transactionHex
        );

        const refundTransaction = constructRefundTransaction(
          ECPair.fromPrivateKey(getHexBuffer(refundFile.privateKey)),
          redeemScript,
          refundFile.timeoutBlockHeight,
          // TODO: make sure the provided lockup transaction hash was correct and show more specific error is not
          {
            txHash: lockupTransaction.getHash(),
            ...detectSwap(redeemScript, lockupTransaction),
          },
          address.toOutputScript(destinationAddress, Networks.litecoinSimnet)
        );

        console.log(refundTransaction.toHex());

        const refundTransactionHex = refundTransaction.toHex();
        const refundTransactionHash = refundTransaction.getId();

        dispatch(setRefundTransaction(refundTransactionHex));
        dispatch(setRefundTransactionHash(refundTransactionHash));
        dispatch(refundResponse(true, response.data));

        broadcastRefund(currency, refundTransactionHex);

        cb();
      })
      .catch(error => {
        console.log(error);
        window.alert('Failed to refund swap');
        dispatch(refundResponse(false, error.data));
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
      .then(response => {
        dispatch(refundResponse(true, response.data));
      })
      .then(() => cb())
      .catch(error => {
        window.alert(`Failed to broadcast refund transaction`);
        dispatch(refundResponse(false, error.data));
      });
  };
};
