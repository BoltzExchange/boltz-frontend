import * as actionTypes from '../../constants/actions';

export const toggleSwapMode = () => ({
  type: actionTypes.ENTER_SWAP_MODE,
});

/**
 * @param sent amount sent
 * @param received amount received
 */
export const setSwapAmount = (sent, received) => ({
  type: actionTypes.SET_SWAP_AMOUNT,
  payload: {
    sent,
    received,
  },
});
