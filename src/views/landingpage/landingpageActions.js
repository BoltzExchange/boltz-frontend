import axios from 'axios';
import { Set } from 'core-js';
import { boltzApi } from '../../constants';
import { splitPairId, roundWholeCoins } from '../../scripts/utils';
import * as actionTypes from '../../constants/actions';

const pairsRequest = () => ({
  type: actionTypes.PAIRS_REQUEST,
});

const pairsResponse = data => ({
  type: actionTypes.PAIRS_RESPONSE,
  payload: data,
});

const limitsRequest = () => ({
  type: actionTypes.LIMITS_REQUEST,
});

const limitsResponse = data => ({
  type: actionTypes.LIMITS_RESPONSE,
  payload: data,
});

const parseRates = pairs => {
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

const parseCurrencies = pairs => {
  const currencies = [];
  const contains = new Set();

  const addToArray = currency => {
    if (!contains.has(currency)) {
      contains.add(currency);
      currencies.push(currency);
    }
  };

  const pushCurrency = currency => {
    addToArray(currency);
    addToArray(`${currency} ⚡`);
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
      const rates = parseRates(response.data);
      const currencies = parseCurrencies(response.data);

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

const parseLimits = (rates, data) => {
  const limits = {};
  const keys = Object.keys(data);

  keys.forEach(key => {
    const value = data[key];
    const { base, quote } = splitPairId(key);

    limits[key] = value;

    // Add limits for sell orders
    if (base !== quote) {
      const reverseSymbol = `${quote}/${base}`;
      const reverseRate = rates[reverseSymbol].rate;

      limits[reverseSymbol] = {
        minimal: roundWholeCoins(value.minimal / reverseRate),
        maximal: roundWholeCoins(value.maximal / reverseRate),
      };
    }
  });

  return limits;
};

export const getLimits = (rates, cb) => {
  const url = `${boltzApi}/getlimits`;

  return dispatch => {
    dispatch(limitsRequest());
    axios.get(url).then(response => {
      const limits = parseLimits(rates, response.data);

      dispatch(limitsResponse(limits));

      cb();
    });
  };
};
