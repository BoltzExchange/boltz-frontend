import * as actionTypes from '../constants/actions';

/**
 * Save the id of reverse swap to save
 * @param {String} id
 */
export const dataStorageSetId = id => ({
  type: actionTypes.SET_ID,
  payload: id,
});

/**
 *  Save asset type and amount of the reverse swap.
 * @param {String} asset
 * @param {Number} amount
 */
export const dataStorageSetAsset = (asset, amount) => ({
  type: actionTypes.SET_ASSET,
  payload: {
    asset,
    amount,
  },
});

export const dataStorageClear = () => ({
  type: actionTypes.CLEAR_DATA_STORAGE,
});
