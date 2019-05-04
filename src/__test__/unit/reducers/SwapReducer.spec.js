
import swapReducer, { initialState } from '../../../reducers/swapReducer';
import * as actions from '../../../constants/actions';

describe('swap reducer', () => {
  it('should return the initial state', () => {
    expect(swapReducer(initialState, {})).toEqual({
      ...initialState,
    });
  });

  it(`should handle ${actions.SWAP_REQUEST}`, () => {
    expect(
      swapReducer(
        {},
        {
          type: actions.SWAP_REQUEST,
        }
      )
    ).toEqual({
      isFetching: true,
    });
  });

  it(`should handle ${actions.SWAP_RESPONSE}`, () => {
    expect(
      swapReducer(
        {},
        {
          type: actions.SWAP_RESPONSE,
          payload: 'payload',
        }
      )
    ).toEqual({
      isFetching: false,
      swapResponse: 'payload',
    });
  });

  it(`should handle ${actions.INIT_SWAP}`, () => {
    const payload = {
      webln: undefined,
      base: 'BTC',
      quote: 'LTC',
      baseAmount: 1,
      quoteAmount: 0.01,
      keys: {},
      pair: [],
    };

    expect(
      swapReducer(
        {},
        {
          type: actions.INIT_SWAP,
          payload,
        }
      )
    ).toEqual({
      inSwapMode: true,
      webln: payload.webln,
      swapInfo: {
        base: payload.base,
        quote: payload.quote,
        baseAmount: payload.baseAmount,
        quoteAmount: payload.quoteAmount,
        keys: payload.keys,
        pair: payload.pair,
      },
    });
  });

  it(`should handle ${actions.SET_SWAP_INVOICE}`, () => {
    const payload = {
      invoice: 'invoice',
      error: false,
    };
    expect(
      swapReducer(
        {},
        {
          type: actions.SET_SWAP_INVOICE,
          payload,
        }
      )
    ).toEqual({
      swapInfo: {
        invoice: payload.invoice,
      },
      swapStatus: {
        error: payload.error,
      },
    });
  });

  it(`should handle ${actions.SET_SWAP_STATUS}`, () => {
    const payload = {
      pending: true,
      message: 'message',
    };
    expect(
      swapReducer(
        {},
        {
          type: actions.SET_SWAP_STATUS,
          payload,
        }
      )
    ).toEqual({
      swapStatus: {
        ...payload,
      },
    });
  });

  it(`should handle ${actions.COMPLETE_SWAP}`, () => {
    expect(
      swapReducer(
        {},
        {
          type: actions.COMPLETE_SWAP,
        }
      )
    ).toEqual(initialState);
  });
});
