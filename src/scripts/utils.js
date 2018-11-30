/**
 * Get a hex encoded string from a Buffer
 *
 * @param input {Buffer} input
 * @returns a hex encoded string
 */
export const getHexString = input => {
  return input.toString('hex');
};
