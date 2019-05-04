import * as actions from '../../../actions/refundActions';
import * as actionTypes from '../../../constants/actions';

describe('refund actions', () => {
  it('should start refund action', () => {
    const expectedAction = {
      type: actionTypes.REFUND_REQUEST,
    };
    expect(actions.refundRequest()).toEqual(expectedAction);
  });

  it('should set refund file action', () => {
    const validJson = JSON.stringify({
      currency: 'BTC',
      redeemScript: 'script',
      privateKey: 'pvk',
      timeoutBlockHeight: 5,
    });
    const invalidJson = JSON.stringify({ currency: 'BTC' });

    const validAction = {
      type: actionTypes.SET_REFUND_FILE,
      payload: JSON.parse(validJson),
    };

    const invaliAction = {
      type: actionTypes.SET_REFUND_FILE,
      payload: {},
    };
    expect(actions.setRefundFile(validJson)).toEqual(validAction);
    expect(actions.setRefundFile(invalidJson)).toEqual(invaliAction);
  });

  it('should set transaction hash action', () => {
    const hash = 'hash';
    const expectedAction = {
      type: actionTypes.SET_REFUND_TXHASH,
      payload: hash,
    };
    expect(actions.setTransactionHash(hash)).toEqual(expectedAction);
  });

  it('should set destination address action', () => {
    const address = 'address';
    const expectedAction = {
      type: actionTypes.SET_REFUND_DESTINATION,
      payload: address,
    };
    expect(actions.setDestinationAddress(address)).toEqual(expectedAction);
  });

  it('should set refund transaction hash action', () => {
    const txhash = 'txhash';
    const expectedAction = {
      type: actionTypes.SET_REFUND_TRANSACTION_HASH,
      payload: txhash,
    };
    expect(actions.setRefundTransactionHash(txhash)).toEqual(expectedAction);
  });

  it('should set refund response action', () => {
    const payload = {
      success: false,
      response: {},
    };

    const expectedAction = {
      type: actionTypes.REFUND_RESPONSE,
      payload,
    };
    expect(actions.refundResponse(payload.success, payload.response)).toEqual(
      expectedAction
    );
  });

  it('should complete refund action', () => {
    const expectedAction = {
      type: actionTypes.COMPLETE_REFUND,
    };
    expect(actions.completeRefund()).toEqual(expectedAction);
  });
});
