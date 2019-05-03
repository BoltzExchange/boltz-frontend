/* eslint-disable no-undef */
import reducer, { initialState } from '../../../reducers/landingpageReducer';
import * as actions from '../../../constants/actions';

describe('landing page reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual({
      ...initialState,
    });
  });

  it(`should handle ${actions.PAIRS_RESPONSE}`, () => {
    const payload = {
      type: actions.PAIRS_RESPONSE,
      payload: {
        fees: 'fees',
        rates: 'rates',
        limits: 'limits',
        currencies: 'currencies',
      },
    };
    expect(reducer({}, payload)).toEqual({
      ...payload.payload,
    });
  });

  it(`should handle ${actions.RESOURCE_ERROR}`, () => {
    const payload = {
      type: actions.RESOURCE_ERROR,
      payload: 'error message',
    };
    expect(reducer({}, payload)).toEqual({ errorMessage: payload.payload });
  });
});
