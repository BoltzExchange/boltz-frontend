/* eslint-disable no-undef */
import { generateKeys } from '../../../actions/keys';
import { bitcoinNetwork } from '../../../constants';

describe('generate keys', () => {
  it('should generate key pair', () => {
    const keys = generateKeys(bitcoinNetwork);
    expect(typeof keys.publicKey === 'string').toBe(true);
    expect(typeof keys.privateKey === 'string').toBe(true);
    expect(keys).toHaveProperty('publicKey');
    expect(keys).toHaveProperty('privateKey');
  });
});
