import { ECPair } from 'bitcoinjs-lib';
import { getHexString } from '../../utils';

export const generateKeys = network => {
  const keys = ECPair.makeRandom({ network });

  return {
    publicKey: getHexString(keys.publicKey),
    privateKey: getHexString(keys.privateKey),
  };
};
