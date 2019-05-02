/* eslint-disable no-undef */
import refundReducer, { initialState } from '../../../reducers/refundReducer';
import * as actions from '../../../constants/actions';

describe('refund reducer', () => {
  it('should return the initial state', () => {
    expect(refundReducer(initialState, {})).toEqual({
      ...initialState,
    });
  });

  it(`should handel ${actions.REFUND_REQUEST}`, () => {
    expect(
      refundReducer(
        {},
        {
          type: actions.REFUND_REQUEST,
        }
      )
    ).toEqual({
      isFetching: true,
    });
  });

  it(`should reducer ${actions.REFUND_RESPONSE}`, () => {
    expect(
      refundReducer(
        {},
        {
          type: actions.REFUND_RESPONSE,
        }
      )
    ).toEqual({
      isFetching: false,
    });
  });

  it(`should handel ${actions.SET_REFUND_FILE}`, () => {
    const payload = {
      type: actions.SET_REFUND_FILE,
      payload: {},
    };
    expect(refundReducer({}, payload)).toEqual({
      refundFile: payload.payload,
    });
  });

  it(`should handel ${actions.SET_REFUND_TXHASH}`, () => {
    const payload = {
      type: actions.SET_REFUND_TXHASH,
      payload: 'hash',
    };
    expect(refundReducer({}, payload)).toEqual({
      transactionHash: 'hash',
    });
  });

  it(`should handel ${actions.SET_REFUND_DESTINATION}`, () => {
    const payload = {
      type: actions.SET_REFUND_DESTINATION,
      payload: 'address',
    };
    expect(refundReducer({}, payload)).toEqual({
      destinationAddress: payload.payload,
    });
  });

  it(`should handel ${actions.SET_REFUND_TRANSACTION_HASH}`, () => {
    const payload = {
      type: actions.SET_REFUND_TRANSACTION_HASH,
      payload: 'hash',
    };
    expect(refundReducer({}, payload)).toEqual({
      refundTransactionHash: payload.payload,
    });
  });

  it(`should handel ${actions.COMPLETE_SWAP}`, () => {
    expect(
      refundReducer(
        {},
        {
          type: actions.COMPLETE_REFUND,
        }
      )
    ).toEqual(initialState);
  });
});
