
import * as actions from '../../../actions/swapActions';
import * as actionTypes from '../../../constants/actions';

describe('swap actions', () => {
  it('should intiate a swap', () => {
    const payload = {
      base: 'LTC',
      baseAmount: 0.01173799,
      keys: {
        publicKey:
          '02557b158a2a7a661e29dcd702bacdf961a3f9a6d99fb67e30c6c237f181dbf3c0',
        privateKey:
          'b4a608794529cde7e484c676264ea7bd81c428c1e14ff4c7c91bfab27717902b',
      },
      pair: { id: 'LTC/BTC', orderSide: 'sell' },
      quote: 'BTC',
      quoteAmount: 0.00015835,
      webln: undefined,
    };

    const expectedAction = {
      type: actionTypes.INIT_SWAP,
      payload,
    };
    expect(actions.initSwap(payload)).toEqual(expectedAction);
  });

  it('should set swap invoice', () => {
    const payload = {
      invoice: 'invoice',
      error: true,
    };
    const expectedAction = {
      type: actionTypes.SET_SWAP_INVOICE,
      payload,
    };
    expect(actions.setSwapInvoice(payload.invoice, payload.error)).toEqual(
      expectedAction
    );
  });

  it('should set swap status', () => {
    const status = 'status';
    const expectedAction = {
      type: actionTypes.SET_SWAP_STATUS,
      payload: status,
    };
    expect(actions.setSwapStatus(status)).toEqual(expectedAction);
  });

  it('should set swap response', () => {
    const response = {
      success: false,
      response: {},
    };
    const expectedAction = {
      type: actionTypes.SWAP_RESPONSE,
      payload: response,
    };
    expect(actions.swapResponse(false, {})).toEqual(expectedAction);
  });
});
