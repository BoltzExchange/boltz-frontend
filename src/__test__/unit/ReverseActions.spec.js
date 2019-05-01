/* eslint-disable no-undef */
import * as actions from '../../actions/reverseActions';
import * as actionTypes from '../../constants/actions';

describe('reverse swap actions', () => {
  it('should initiate reverse swap action', () => {
    const expectedAction = {
      type: actionTypes.INIT_REVERSE_SWAP,
      payload: {},
    };
    expect(actions.initReverseSwap({})).toEqual(expectedAction);
  });

  it('should set reverse swap address action', () => {
    const payload = {
      address: 'address',
      error: false,
    };

    const expectedAction = {
      type: actionTypes.SET_REVERSE_SWAP_ADDRESS,
      payload,
    };
    expect(
      actions.setReverseSwapAddress(payload.address, payload.error)
    ).toEqual(expectedAction);
  });

  it('should set reverse swap status action', () => {
    const status = 'status';
    const expectedAction = {
      type: actionTypes.SET_REVERSE_SWAP_STATUS,
      payload: status,
    };
    expect(actions.setReverseSwapStatus(status)).toEqual(expectedAction);
  });

  it('should request reverse swap action', () => {
    const expectedAction = {
      type: actionTypes.REVERSE_SWAP_REQUEST,
    };
    expect(actions.reverseSwapRequest()).toEqual(expectedAction);
  });

  it('should set reverse swap response action', () => {
    const payload = {
      success: false,
      response: {},
    };

    const expectedAction = {
      type: actionTypes.REVERSE_SWAP_RESPONSE,
      payload,
    };

    expect(
      actions.reverseSwapResponse(payload.success, payload.response)
    ).toEqual(expectedAction);
  });

  it('should set reconnecting action', () => {
    const reconnecting = true;
    const expectedAction = {
      type: actionTypes.SET_IS_RECONNECTING,
      payload: reconnecting,
    };

    expect(actions.setIsReconnecting(reconnecting)).toEqual(expectedAction);
  });

  it('should complete reverse swap action', () => {
    const expectedAction = {
      type: actionTypes.COMPLETE_REVERSE_SWAP,
    };
    expect(actions.completeReverseSwap()).toEqual(expectedAction);
  });
});
