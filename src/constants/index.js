import { Networks } from 'boltz-core';

// API endpoint
export const boltzApi = process.env.REACT_APP_BOLTZ_API;

// Network configurations
export const bitcoinNetwork = Networks[process.env.REACT_APP_BITCOIN_NETWORK];
export const litecoinNetwork = Networks[process.env.REACT_APP_LITECOIN_NETWORK];

export const bitcoinExplorer = process.env.REACT_APP_BITCOIN_EXPLORER;
export const litecoinExplorer = process.env.REACT_APP_LITECOIN_EXPLORER;

// Sample values
export const lockupTransactionHash =
  process.env.REACT_APP_LOCKUP_TRANSACTION_HASH;

export const bitcoinAddress = process.env.REACT_APP_BITCOIN_ADDRESS;
export const litecoinAddress = process.env.REACT_APP_LITECOIN_ADDRESS;

export const bitcoinInvoice = process.env.REACT_APP_BITCOIN_INVOICE;
export const litecoinInvoice = process.env.REACT_APP_LITECOIN_INVOICE;
