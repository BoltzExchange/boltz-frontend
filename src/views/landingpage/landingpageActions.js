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

    // Set the rate for a sell order
    rates[pair] = {
      rate: rate,
      pair: {
        id: pair,
        orderSide: 'sell',
      },
    };

    // And for a buy order
    const { base, quote } = splitPairId(pair);
    rates[`${quote}/${base}`] = {
      rate: 1 / rate,
      pair: {
        id: pair,
        orderSide: 'buy',
      },
    };
  }

  return rates;
};

const getCurrencies = pairs => {
  const currencies = [];

  const pushCurrency = currency => {
    currencies.push(currency);
    currencies.push(`${currency} ⚡`);
  };

  for (const pair in pairs) {
    const { base, quote } = splitPairId(pair);

    pushCurrency(base);
    pushCurrency(quote);
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
