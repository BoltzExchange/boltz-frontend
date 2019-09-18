import { Networks } from 'boltz-core';

const capitalizeFirstLetter = input => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

export const SwapUpdateEvent = {
  InvoicePaid: 'invoice.paid',
  InvoiceSettled: 'invoice.settled',
  InvoiceFailedToPay: 'invoice.failedToPay',

  TransactionClaimed: 'transaction.claimed',
  TransactionRefunded: 'transaction.refunded',
  TransactionConfirmed: 'transaction.confirmed',

  SwapExpired: 'swap.expired',
};

export const ServiceWarnings = {
  ReverseSwapsDisabled: 'reverse.swaps.disabled',
};

/**
 * Values from the environment
 */

// Onion URL
export const boltzOnion = process.env.REACT_APP_BOLTZ_ONION;

// API endpoint; will be set to the onion endpoint if Boltz is accessed via Tor
const splitHost = window.location.hostname.split('.');

if (splitHost[0] === 'www') {
  splitHost.shift();
}

export const boltzApi =
  splitHost[1] !== 'onion'
    ? process.env.REACT_APP_BOLTZ_API
    : process.env.REACT_APP_BOLTZ_API_ONION;

console.log(boltzApi);

// LND node URIs
export const bitcoinLnd = process.env.REACT_APP_BITCOIN_LND;
export const bitcoinLndOnion = process.env.REACT_APP_BITCOIN_LND_ONION;

export const litecoinLnd = process.env.REACT_APP_LITECOIN_LND;
export const litecoinLndOnion = process.env.REACT_APP_LITECOIN_LND_ONION;

// Network configurations
export const network = process.env.REACT_APP_NETWORK;

export const bitcoinNetwork =
  Networks[`bitcoin${capitalizeFirstLetter(network)}`];
export const litecoinNetwork =
  Networks[`litecoin${capitalizeFirstLetter(network)}`];

export const bitcoinExplorer = process.env.REACT_APP_BITCOIN_EXPLORER;
export const litecoinExplorer = process.env.REACT_APP_LITECOIN_EXPLORER;

// Sample values
export const lockupTransactionHash =
  process.env.REACT_APP_LOCKUP_TRANSACTION_HASH;

export const bitcoinAddress = process.env.REACT_APP_BITCOIN_ADDRESS;
export const litecoinAddress = process.env.REACT_APP_LITECOIN_ADDRESS;

export const bitcoinInvoice = process.env.REACT_APP_BITCOIN_INVOICE;
export const litecoinInvoice = process.env.REACT_APP_LITECOIN_INVOICE;
