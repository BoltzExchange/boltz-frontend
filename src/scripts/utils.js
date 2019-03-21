import axios from 'axios';
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

// Number satohis and litoshis in a whole coin
export const decimals = 100000000;

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
 * Read the content of a file
 *
 * @param file file that should be read
 * @param cb callback that will be called once the file is read
 */
export const readFile = (file, cb) => {
  const reader = new window.FileReader();

  reader.onload = () => {
    cb(reader.result);
  };

  reader.readAsText(file);
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
  range.selectNode(document.getElementById('copy'));
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
