import * as actionTypes from '../constants/actions';

/**
 *
 * @param {String} id
 */
export const dataStorageSetId = id => ({
  type: actionTypes.SET_ID,
  payload: id,
});

/**
 *
 * @param {String} asset
 * @param {Number} amount
 */
export const dataStorageSetAsset = (asset, amount) => ({
  type: actionTypes.SET_ID,
  payload: {
    asset,
    amount,
  },
});

export const dataStorageClear = () => ({
  type: actionTypes.CLEAR_DATA_STORAGE,
});
