/* eslint-disable no-undef */
import reducer, { initialState } from '../../../reducers/reverseReducer';
import * as actions from '../../../constants/actions';

describe('reverse swap reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it(`should handle ${actions.REVERSE_SWAP_REQUEST}`, () => {
    const action = {
      type: actions.REVERSE_SWAP_REQUEST,
    };
    expect(reducer({}, action)).toEqual({
      isFetching: true,
    });
  });

  it(`should handle ${actions.REVERSE_SWAP_RESPONSE}`, () => {
    const action = {
      type: actions.REVERSE_SWAP_RESPONSE,
      payload: {
        response: 'response',
        success: false,
      },
    };
    expect(reducer({}, action)).toEqual({
      isFetching: false,
      swapResponse: {
        response: action.payload.response,
        success: action.payload.success,
      },
    });
  });

  it(`should handle ${actions.INIT_REVERSE_SWAP}`, () => {
    const action = {
      type: actions.INIT_REVERSE_SWAP,
      payload: {
        webln: undefined,
        base: 'base',
        quote: 'quote',
        baseAmount: 'baseAmount',
        quoteAmount: 'quoteAmount',
        keys: 'keys',
        pair: 'pair',
      },
    };

    expect(reducer({}, action)).toEqual({
      inSwapMode: true,
      webln: action.payload.webln,
      swapInfo: {
        base: 'base',
        quote: 'quote',
        baseAmount: 'baseAmount',
        quoteAmount: 'quoteAmount',
        keys: 'keys',
        pair: 'pair',
      },
    });
  });

  it(`should handle ${actions.SET_REVERSE_SWAP_ADDRESS}`, () => {
    const action = {
      type: actions.SET_REVERSE_SWAP_ADDRESS,
      payload: {
        address: 'address',
        error: true,
      },
    };
    expect(reducer({}, action)).toEqual({
      swapInfo: {
        address: action.payload.address,
      },
      invalidAddress: action.payload.error,
    });
  });

  it(`should handle ${actions.SET_REVERSE_SWAP_STATUS}`, () => {
    const action = {
      type: actions.SET_REVERSE_SWAP_STATUS,
      payload: 'swap status',
    };
    expect(reducer({}, action)).toEqual({
      swapStatus: action.payload,
    });
  });

  it(`should handle ${actions.SET_IS_RECONNECTING}`, () => {
    const action = {
      type: actions.SET_IS_RECONNECTING,
      payload: false,
    };
    expect(reducer({}, action)).toEqual({
      isReconnecting: action.payload,
    });
  });

  it(`should handle ${actions.COMPLETE_REVERSE_SWAP}`, () => {
    const action = {
      type: actions.COMPLETE_REVERSE_SWAP,
    };
    expect(reducer({}, action)).toEqual(initialState);
  });
});
