/* eslint-disable no-undef */
import refundReducer, { initalState } from '../../../reducers/refundReducer';
import * as actions from '../../../constants/actions';

describe('swap reducer', () => {
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

  it(`should handel ${actions}`, () => {});
  it(`should handel ${actions}`, () => {});
  it(`should handel ${actions}`, () => {});

  it(`should handel ${actions.COMPLETE_SWAP}`, () => {
    expect(
      refundReducer(
        {},
        {
          type: actions.COMPLETE_REFUND,
        }
      )
    ).toEqual(initalState);
  });
});
