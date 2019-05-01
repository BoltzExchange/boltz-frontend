/* eslint-disable no-undef */
import * as actions from '../../../actions/landingPageActions';
import * as actionTypes from '../../../constants/actions';

describe('landing page actions', () => {
  it('should request pairs action', () => {
    const expectedAction = {
      type: actionTypes.PAIRS_REQUEST,
    };
    expect(actions.pairsRequest()).toEqual(expectedAction);
  });

  it('should respond with paris action', () => {
    const expectedAction = {
      type: actionTypes.PAIRS_RESPONSE,
      payload: {},
    };
    expect(actions.pairsResponse({})).toEqual(expectedAction);
  });
});
