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
 * Convert BTC to Satoshi.
 *
 * @param btc btc
 * @returns satoshi
 */
export const toSatoshi = btc => {
  return (btc * 100000000 * 10) / 10;
};
