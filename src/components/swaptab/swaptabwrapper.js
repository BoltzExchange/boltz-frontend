import React from 'react';
import BigNumber from 'bignumber.js';
import PropTypes from 'prop-types';
import { ServiceWarnings } from '../../constants';
import { decimals } from '../../utils';

class SwapTabWrapper extends React.Component {
  constructor(props) {
    super(props);

    if (props.warnings.includes(ServiceWarnings.ReverseSwapsDisabled)) {
      this.reverseSwapsDisabled = true;
    }

    this.qouteStep = new BigNumber('0.001');
    this.baseStep = new BigNumber('1').dividedBy(decimals);

    this.state = {
      baseAsset: {},
      quoteAsset: {},
      disabled: false,
      error: false,
      inputError: false,
      base: 'LTC',
      quote: 'BTC ⚡',
      minAmount: new BigNumber('0'),
      maxAmount: new BigNumber('0'),
      baseAmount: new BigNumber('0.05'),
      quoteAmount: new BigNumber('0'),
      feeAmount: new BigNumber('0'),
      errorMessage: '',
    };
  }

  updateAssets = (isBase, symbol, isLightning) => {
    if (isBase) {
      this.baseAsset = {
        symbol,
        isLightning,
      };
    } else {
      this.quoteAsset = {
        symbol,
        isLightning,
      };
    }
  };

  parseBoltSuffix = (entry, isBase) => {
    const index = entry.lastIndexOf('⚡');
    const isLightning = index !== -1;

    const symbol = isLightning ? entry.substr(0, index - 1) : entry;

    this.updateAssets(isBase, symbol, isLightning);

    return symbol;
  };

  getSymbol = () => {
    return `${this.parseBoltSuffix(
      this.state.base,
      true
    )}/${this.parseBoltSuffix(this.state.quote, false)}`;
  };

  componentWillMount = () => {
    if (localStorage.getItem('quote')) {
      this.setState({
        base: localStorage.getItem('base'),
        quote: localStorage.getItem('quote'),
        baseAmount: new BigNumber(localStorage.getItem('baseAmount')),
      });
    }
  };

  componentDidMount = () => {
    const symbol = this.getSymbol();
    const limits = this.props.limits[symbol];
    this.setState(
      {
        minAmount: new BigNumber(limits.minimal),
        maxAmount: new BigNumber(limits.maximal),
        rate: this.props.rates[symbol],
      },
      () => {
        this.updateQuoteAmount(this.state.baseAmount);
        this.componentDidUpdate({}, {});
      }
    );
  };

  componentDidUpdate = (_, prevState) => {
    const { base, quote, baseAmount } = this.state;

    // If rate is undefined disable input
    if (this.state.rate !== prevState.rate) {
      this.noRateAvailable();
    }

    // Update the rate if the request finished or the currencies changed
    if (
      prevState.base !== this.state.base ||
      prevState.quote !== this.state.quote
    ) {
      const symbol = this.getSymbol();

      // Swapping from chain to chain or from Lightning to Lightning is not supported right now
      if (
        base === quote ||
        (this.baseAsset.isLightning && this.quoteAsset.isLightning)
      ) {
        this.setState({
          rate: undefined,
          error: true,
          errorMessage: 'Choose a different asset',
        });
        return;
      }

      if (!this.baseAsset.isLightning && !this.quoteAsset.isLightning) {
        this.setState({
          rate: undefined,
          error: true,
          errorMessage: 'Coming soon',
        });
        return;
      }

      // Show an error for reverse swaps if they are disabled
      if (this.reverseSwapsDisabled && this.baseAsset.isLightning) {
        this.setState({
          rate: undefined,
          error: true,
          errorMessage: 'Currently not available',
        });
        return;
      }

      const rate = this.props.rates[symbol];
      const limits = this.props.limits[symbol];
      const feePercentage = this.props.fees.percentages[symbol];
      this.setState(
        {
          rate,
          feePercentage,
          minAmount: new BigNumber(limits.minimal).dividedBy(decimals),
          maxAmount: new BigNumber(limits.maximal).dividedBy(decimals),
          error: false,
        },
        () => this.updateQuoteAmount(this.state.baseAmount)
      );
    }

    if (!this.state.inputError && !this.state.error) {
      localStorage.setItem('base', base);
      localStorage.setItem('quote', quote);
      localStorage.setItem('baseAmount', baseAmount);
    }
  };

  calculateMinerFee = () => {
    const { minerFees } = this.props.fees;

    if (this.baseAsset.isLightning) {
      const { lockup, claim } = minerFees[this.quoteAsset.symbol].reverse;

      return lockup + claim;
    } else {
      return minerFees[this.baseAsset.symbol].normal;
    }
  };

  /**
   * @param { BigNumber } baseAmount
   */
  calculateFee = baseAmount => {
    const feePercentage = new BigNumber(this.state.feePercentage);

    const percentageFee = feePercentage.times(baseAmount);
    const minerFee = new BigNumber(this.calculateMinerFee()).dividedBy(
      decimals
    );

    return percentageFee.plus(minerFee);
  };
  /**
   * @param { BigNumber } baseAmount
   */
  checkBaseAmount = baseAmount => {
    const { minAmount, maxAmount } = this.state;

    return (
      baseAmount.isLessThanOrEqualTo(maxAmount) &&
      baseAmount.isGreaterThanOrEqualTo(minAmount)
    );
  };

  updatePair = (quote, base) => {
    this.setState({ base, quote, error: false, errorMessage: '' });
  };

  noRateAvailable = () => {
    this.state.rate
      ? this.setState({ disabled: false })
      : this.setState({ disabled: true });
  };

  updateBaseAmount = quoteAmount => {
    const amount = new BigNumber(quoteAmount);
    const rate = new BigNumber(this.state.rate.rate);

    const newBase = amount.dividedBy(rate);
    const fee = this.calculateFee(newBase);

    const newBaseWithFee = fee.plus(newBase);

    const inputError = !this.checkBaseAmount(newBaseWithFee);

    this.setState({
      quoteAmount: amount,
      baseAmount: newBaseWithFee,
      feeAmount: fee,
      inputError,
    });
  };

  updateQuoteAmount = baseAmount => {
    const amount = new BigNumber(baseAmount.toString());
    const rate = new BigNumber(this.state.rate.rate);
    const { orderSide } = this.state.rate;
    let fee = this.calculateFee(amount);

    if (orderSide === 'sell') {
      fee = fee.times(rate);
    }

    const quote = amount.times(rate).minus(fee);

    const inputError = !this.checkBaseAmount(amount);
    this.setState({
      quoteAmount: quote,
      baseAmount: amount,
      feeAmount: fee,
      inputError,
    });
  };

  shouldSubmit = () => {
    const { error, rate, baseAmount, quoteAmount } = this.state;

    if (error === false && this.rate !== 'Not found') {
      const state = {
        baseAmount: baseAmount.toFixed(8),
        quoteAmount: quoteAmount.toFixed(8),
        base: this.baseAsset.symbol,
        quote: this.quoteAsset.symbol,
        isReverseSwap: this.baseAsset.isLightning,
        pair: {
          id: rate.pair,
          orderSide: rate.orderSide,
        },
      };

      this.props.onPress(state);
    }
  };

  parseRate = () => {
    const rate = this.state.rate;

    if (rate) {
      return rate.rate.toFixed(5);
    } else {
      return 'Not found';
    }
  };

  switchPair = () => {
    this.setState({
      base: this.state.quote,
      baseAmount: this.state.quoteAmount,
      quote: this.state.base,
      quoteAmount: this.state.baseAmount,
    });
  };

  render() {
    return this.props.children({
      ...this.state,
      classes: this.props.classes,
      onPress: this.props.onPress,
      fees: this.props.fees,
      rates: this.props.rates,
      limits: this.props.limits,
      currencies: this.props.currencies,
      parseRate: this.parseRate,
      updateQuoteAmount: this.updateQuoteAmount,
      updateBaseAmount: this.updateBaseAmount,
      switchPair: this.switchPair,
      updatePair: this.updatePair,
      shouldSubmit: this.shouldSubmit,
      baseStep: this.baseStep,
      qouteStep: this.qouteStep,
    });
  }
}

SwapTabWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  classes: PropTypes.object,
  warnings: PropTypes.array.isRequired,
  onPress: PropTypes.func,
  fees: PropTypes.object.isRequired,
  rates: PropTypes.object.isRequired,
  limits: PropTypes.object.isRequired,
  currencies: PropTypes.array.isRequired,
};

export default SwapTabWrapper;
