import { ECPair } from 'bitcoinjs-lib';
import { NEW_KEYS } from '../../constants/actions';
import { getHexString } from '../../scripts/utils';

class GenerateKeys {
  constructor() {
    const map = new Map();

    /**
     * @param network network to generate key for
     * @returns publicKey
     */
    this.newKeys = network => {
      map.clear(); /* make sure there is only one key pair */
      const keyPair = ECPair.makeRandom({ network });
      map.set(
        getHexString(keyPair.publicKey),
        getHexString(keyPair.privateKey)
      );

      return {
        type: NEW_KEYS,
        payload: getHexString(keyPair.publicKey),
      };
    };

    /**
     * @param publicHexKey public key
     * @returns private key
     */
    this.getPrivateKey = publicHexKey => {
      const privateKey = map.get(publicHexKey);
      return privateKey;
    };

    /**
     * Clear keys
     */
    this.clearKeys = () => {
      console.log('/////');
      console.log(map.entries());
      console.log('/////');
      map.clear();
    };
  }
}

export default GenerateKeys;
