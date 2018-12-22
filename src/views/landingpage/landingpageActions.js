import axios from 'axios';
import { boltzApi } from '../../constants';
import * as actionTypes from '../../constants/actions';
import { splitPairId } from '../../scripts/utils';

const pairsRequest = () => ({
  type: actionTypes.PAIRS_REQUEST,
});

const pairsResponse = data => ({
  type: actionTypes.PAIRS_RESPONSE,
  payload: data,
});

const getRates = pairs => {
  const rates = {};

  for (const pair in pairs) {
    const rate = pairs[pair];

    // Set the rate for a buy order
    rates[pair] = rate.toFixed(5);

    // And for a sell order
    const { base, quote } = splitPairId(pair);
    rates[`${quote}/${base}`] = (1 / rate).toFixed(5);
  }

  return rates;
};

const getCurrencies = pairs => {
  const currencies = [];

  for (const pair in pairs) {
    const { base, quote } = splitPairId(pair);

    currencies.push(base);
    currencies.push(quote);
  }

  return currencies;
};

export const getPairs = cb => {
  const url = `${boltzApi}/getpairs`;

  return dispatch => {
    dispatch(pairsRequest());
    axios.get(url).then(response => {
      const rates = getRates(response.data);
      const currencies = getCurrencies(response.data);

      dispatch(
        pairsResponse({
          rates,
          currencies,
        })
      );

      cb();
    });
  };
};
