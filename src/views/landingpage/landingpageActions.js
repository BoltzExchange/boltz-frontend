import axios from 'axios';
import { boltzApi } from '../../constants';
import { splitPairId } from '../../utils';
import * as actionTypes from '../../constants/actions';

const pairsRequest = () => ({
  type: actionTypes.PAIRS_REQUEST,
});

const pairsResponse = data => ({
  type: actionTypes.PAIRS_RESPONSE,
  payload: data,
});

const loadingResourceError = message => ({
  type: actionTypes.RESOURCE_ERROR,
  payload: message,
});

const parseCurrencies = pairs => {
  const currencies = [];

  const pushCurrency = currency => {
    if (!currencies.includes(currency)) {
      currencies.push(currency);
      currencies.push(`${currency} ⚡`);
    }
  };

  for (const pair in pairs) {
    const { base, quote } = splitPairId(pair);

    pushCurrency(base);
    pushCurrency(quote);
  }

  return currencies;
};

const parseRates = pairs => {
  const rates = {};

  for (const id in pairs) {
    const pair = pairs[id];

    // Set the rate for a sell order
    rates[id] = {
      pair: id,
      rate: pair.rate,
      orderSide: 'sell',
    };

    // And for a buy order
    const { base, quote } = splitPairId(id);

    if (base !== quote) {
      rates[`${quote}/${base}`] = {
        pair: id,
        rate: 1 / pair.rate,
        orderSide: 'buy',
      };
    }
  }

  return rates;
};

const parseLimits = (pairs, rates) => {
  const limits = {};

  for (const id in pairs) {
    const pair = pairs[id];
    const { base, quote } = splitPairId(id);

    limits[id] = pair.limits;

    // Add the limits for buy orders
    if (base !== quote) {
      const reverseId = `${quote}/${base}`;
      const reverseRate = rates[reverseId].rate;

      limits[reverseId] = {
        minimal: Math.round(pair.limits.minimal / reverseRate),
        maximal: Math.round(pair.limits.maximal / reverseRate),
      };
    }
  }

  return limits;
};

const parseFees = pairs => {
  const minerFees = {};
  const percentages = {};

  for (const id in pairs) {
    const fees = pairs[id].fees;
    const percentage = fees.percentage / 100;

    const { base, quote } = splitPairId(id);

    percentages[id] = percentage;
    minerFees[base] = fees.minerFees.baseAsset;

    if (base !== quote) {
      percentages[`${quote}/${base}`] = percentage;

      minerFees[quote] = fees.minerFees.quoteAsset;
    }
  }

  return {
    minerFees,
    percentages,
  };
};

export const getPairs = () => {
  const url = `${boltzApi}/getpairs`;

  return dispatch => {
    dispatch(pairsRequest());
    axios
      .get(url)
      .then(response => {
        const currencies = parseCurrencies(response.data);

        const rates = parseRates(response.data);
        const limits = parseLimits(response.data, rates);

        const fees = parseFees(response.data);

        dispatch(
          pairsResponse({
            fees,
            rates,
            limits,
            currencies,
          })
        );
      })
      .catch(error => {
        const errorMessage = error.toString();
        dispatch(
          loadingResourceError({
            message: errorMessage,
            title: 'Could not get rates',
          })
        );
      });
  };
};
