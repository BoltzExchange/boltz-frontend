import * as actions from '../../../actions/datastorageActions';
import * as actionTypes from '../../../constants/actions';

describe('data storage actions', () => {
  it('should create an action to store a swapid', () => {
    const id = '3993939304';
    const expectedAction = {
      type: actionTypes.SET_ID,
      payload: id,
    };
    expect(actions.dataStorageSetId(id)).toEqual(expectedAction);
  });

  it('should create an action to store an asset', () => {
    const payload = {
      asset: 'BTC',
      amount: 4,
    };
    const expectedAction = {
      type: actionTypes.SET_ASSET,
      payload,
    };
    expect(actions.dataStorageSetAsset(payload, payload.amount)).toEqual(
      expectedAction
    );
  });

  it('should clear data storage', () => {
    const expectedAction = {
      type: actionTypes.CLEAR_DATA_STORAGE,
    };
    expect(actions.dataStorageClear()).toEqual(expectedAction);
  });
});
