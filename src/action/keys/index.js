import { ECPair } from 'bitcoinjs-lib';
import { NEW_KEYS } from '../../constants/actions';
import { getHexString } from '../../scripts/utils';

class GenerateKeys {
  constructor() {
    let map = {};

    /**
     * @param network network to generate key for
     * @returns publicKey
     */
    this.newKeys = network => {
      this.clearKeys(); /* make sure there is only one key pair */
      const keyPair = ECPair.makeRandom({ network });
      map = {
        publicKey: getHexString(keyPair.publicKey),
        privateKey: getHexString(keyPair.privateKey),
      };

      return {
        type: NEW_KEYS,
        payload: map.publicKey,
      };
    };

    /**
     * @param publicHexKey public key
     * @returns private key
     */
    this.getPrivateKey = publicHexKey => {
      if (map.publicKey === publicHexKey) {
        return map.privateKey;
      }
    };

    /**
     * Clear keys
     */
    this.clearKeys = () => {
      map = {};
    };
  }
}

export default GenerateKeys;
