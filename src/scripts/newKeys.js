import { ECPair } from 'bitcoinjs-lib';
import { getHexString } from './utils';

/**
 * @param network network to generate key for
 * @returns key pair
 */
export const newKeys = network => {
  const keyPair = ECPair.makeRandom({ network });
  return {
    public: getHexString(keyPair.publicKey),
    private: getHexString(keyPair.privateKey),
  };
};
