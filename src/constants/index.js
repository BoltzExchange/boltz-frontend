import { Networks } from 'boltz-core';

export const boltzApi = process.env.REACT_APP_BOLTZ_API;

export const bitcoinNetwork = Networks[process.env.REACT_APP_BITCOIN_NETWORK];
export const litecoinNetwork = Networks[process.env.REACT_APP_LITECOIN_NETWORK];

export const bitcoinExplorer = process.env.REACT_APP_BITCOIN_EXPLORER;
export const litecoinExplorer = process.env.REACT_APP_LITECOIN_EXPLORER;
