import axios from 'axios';
import BigNumber from 'bignumber.js';
import {
  boltzApi,
  bitcoinNetwork,
  litecoinNetwork,
  bitcoinExplorer,
  litecoinExplorer,
  bitcoinAddress,
  litecoinAddress,
  bitcoinInvoice,
  litecoinInvoice,
} from '../constants';

export const decimals = new BigNumber('100000000');

/**
 * Get a hex encoded string from a Buffer
 *
 * @param input {Buffer} input
 * @returns a hex encoded string
 */
export const getHexString = input => {
  return input.toString('hex');
};

/**
 * Get a hex encoded Buffer from a string
 *
 * @param input {string} input
 * @returns a hex encoded Buffer
 */
export const getHexBuffer = input => {
  return Buffer.from(input, 'hex');
};

/**
 * Get the quote and base asset of a pair id
 */
export const splitPairId = pairId => {
  const split = pairId.split('/');

  return {
    base: split[0],
    quote: split[1],
  };
};

/**
 * Round a amount to 8 decimals and trims unnecessary zeros
 */
export const roundWholeCoins = coins => {
  return Number(coins.toFixed(8));
};

/**
 * Convert satoshis and litoshis to whole coins
 */
export const toWholeCoins = satoshis => {
  return roundWholeCoins(satoshis / decimals);
};

/**
 * Convert whole coins into satoshis or litoshis
 */
export const toSatoshi = coins => {
  return Math.floor(coins * decimals);
};

/**
 * Get the full name of a symbol
 */
export const getCurrencyName = symbol => {
  return symbol === 'BTC' ? 'Bitcoin' : 'Litecoin';
};

/**
 * Get the name of the smallest denomination of a currency
 */
export const getSmallestDenomination = symbol => {
  return symbol === 'BTC' ? 'satoshis' : 'litoshis';
};

// TODO: refactor how we copy
/**
 * Copy the content of the element "copy" into the clipboard
 */
export const copyToClipBoard = () => {
  const range = document.createRange();
  range.selectNodeContents(document.getElementById('copy'));

  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  document.execCommand('copy');
};

/**
 * Get the network for a symbol
 */
export const getNetwork = symbol => {
  return symbol === 'BTC' ? bitcoinNetwork : litecoinNetwork;
};

/**
 * Get the block explorer URL for a symbol
 */
export const getExplorer = symbol => {
  return symbol === 'BTC' ? bitcoinExplorer : litecoinExplorer;
};

/**
 * Get a sample address for a symbol
 */
export const getSampleAddress = symbol => {
  return symbol === 'BTC' ? bitcoinAddress : litecoinAddress;
};

/**
 * Get a sample invoice for a symbol
 */
export const getSampleInvoice = symbol => {
  return symbol === 'BTC' ? bitcoinInvoice : litecoinInvoice;
};

/**
 * Get the fee estimation from the Boltz API
 */
export const getFeeEstimation = callback => {
  const url = `${boltzApi}/getfeeestimation`;
  return () => {
    axios
      .get(url)
      .then(response => callback(response.data))
      .catch(error => {
        window.alert(
          `Failed to get fee estimations: ${error.response.data.error}`
        );
      });
  };
};

/**
 * Detect whether the browser is a mobile one
 */
export const isMobileBrowser = () => {
  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
  );
};

/**
 * @param {{message: string, title: string }} info title and message
 * @param {number} alertType type of alert
 */
export const notificationData = (info, alertType) => {
  let type;
  switch (alertType) {
    case 0:
      type = 'danger';
      break;
    case 1:
      type = 'warning';
      break;
    default:
      type = 'success';
      break;
  }

  return {
    message: info.message,
    title: info.title,
    type,
    insert: 'top-left',
    container: 'top-left',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: { duration: 3500 },
    dismissable: { click: true },
  };
};

/**
 * Formats a number so that it is shown in decimal form without trailing zeros
 */
export const formatAmount = number => {
  return number.toFixed(8).replace(/\.?0+$/, '');
};
