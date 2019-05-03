/* eslint-disable no-undef */
import reducer, { initialState } from '../../../reducers/datastorageReducer';
import * as actions from '../../../constants/actions';

describe('data storage reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it(`should handle ${actions.SET_ID}`, () => {
    expect(
      reducer(
        {},
        {
          type: actions.SET_ID,
          payload: 'id',
        }
      )
    ).toEqual({
      id: 'id',
    });
  });

  it(`should handel ${actions.SET_ASSET}`, () => {
    const payload = {
      asset: 'BTC',
      amount: 4,
    };
    expect(
      reducer(
        {},
        {
          type: actions.SET_ASSET,
          payload,
        }
      )
    ).toEqual({
      ...payload,
    });
  });

  it(`should handel ${actions.CLEAR_DATA_STORAGE}`, () => {
    expect(
      reducer(
        {},
        {
          type: actions.CLEAR_DATA_STORAGE,
        }
      )
    ).toEqual({ ...initialState });
  });
});
