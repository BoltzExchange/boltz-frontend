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
 * Convert BTC to satoshi
 *
 * @param btc btc
 * @returns amount in satoshi
 */
export const toSatoshi = btc => {
  return btc * 100000000;
};

/**
 * Get a hex encoded Buffer from a string
 *
 * @param input {string} input
 * @returns a hex encoded Buffer
 */
export const getHexBuffer = input => {
  return Buffer.from(input, 'hex');
};

/**
 * Read the content of a file
 *
 * @param file file that should be read
 * @param cb callback that will be called once the file is read
 */
export const readFile = (file, cb) => {
  const reader = new window.FileReader();

  reader.onload = () => {
    cb(reader.result);
  };

  reader.readAsText(file);
};

/**
 * Get the quote and base asset of a pair id
 */
export const splitPairId = pairId => {
  const split = pairId.split('/');

  return {
    base: split[0],
    quote: split[1],
  };
};
