import React from 'react';
import PropTypes from 'prop-types';
import { decimals } from '../../utils';

class SwapTabWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseAsset: {},
      quoteAsset: {},
      disabled: false,
      error: false,
      inputError: false,
      base: 'LTC',
      quote: 'BTC ⚡',
      minAmount: 0,
      maxAmount: 0,
      baseAmount: 0.05,
      quoteAmount: 0,
      feeAmount: 0,
      errorMessage: '',
    };
  }

  updateAssets = (isBase, symbol, isLightning) => {
    if (isBase) {
      this.setState({
        baseAsset: {
          symbol,
          isLightning,
        },
      });
    } else {
      this.setState({
        quoteAsset: {
          symbol,
          isLightning,
        },
      });
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
        baseAmount: localStorage.getItem('baseAmount'),
      });
    }
  };

  componentDidMount = () => {
    const symbol = this.getSymbol();
    const limits = this.props.limits[symbol];
    console.log('////////////////////////////');
    console.log(this.props.limits);
    console.log('////////////////////////////');
    this.setState(
      {
        minAmount: limits.minimal,
        maxAmount: limits.maximal,
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

    // If rate if undefined disable input
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
        (this.state.baseAsset.isLightning && this.state.quoteAsset.isLightning)
      ) {
        this.setState({
          rate: undefined,
          error: true,
          errorMessage: 'Choose a different asset',
        });
        return;
      }

      if (
        !this.state.baseAsset.isLightning &&
        !this.state.quoteAsset.isLightning
      ) {
        this.setState({
          rate: undefined,
          error: true,
          errorMessage: 'Coming soon',
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
          minAmount: limits.minimal / decimals,
          maxAmount: limits.maximal / decimals,
          error: false,
        },
        () => this.updateQuoteAmount(this.state.baseAmount)
      );
    }

    // TODO: Remove this once we resolve the issues
    if (
      this.state.quoteAsset.symbol === 'BTC' &&
      !this.state.quoteAsset.isLightning
    ) {
      if (this.state.errorMessage !== 'Currently not available')
        this.setState({
          error: true,
          errorMessage: 'Currently not available',
        });
    }

    localStorage.setItem('base', base);
    localStorage.setItem('quote', quote);
    localStorage.setItem('baseAmount', baseAmount);
  };

  calculateMinerFee = () => {
    const { minerFees } = this.props.fees;

    if (this.state.baseAsset.isLightning) {
      const { lockup, claim } = minerFees[this.state.quoteAsset.symbol].reverse;

      return lockup + claim;
    } else {
      return minerFees[this.state.baseAsset.symbol].normal;
    }
  };

  calculateFee = baseAmount => {
    const { feePercentage } = this.state;

    const percentageFee = baseAmount * feePercentage;
    const minerFee = this.calculateMinerFee() / decimals;

    return percentageFee + minerFee;
  };

  checkBaseAmount = baseAmount => {
    const { minAmount, maxAmount } = this.state;

    return baseAmount <= maxAmount && baseAmount >= minAmount;
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
    const { rate } = this.state.rate;

    const newBase = quoteAmount / rate;
    const fee = this.calculateFee(newBase);

    const newBaseWithFee = Number((newBase + fee).toFixed(8));

    const inputError = !this.checkBaseAmount(newBaseWithFee);

    this.setState({
      quoteAmount: quoteAmount,
      baseAmount: newBaseWithFee,
      feeAmount: fee.toFixed(8),
      inputError,
    });
  };

  updateQuoteAmount = baseAmount => {
    const { rate, orderSide } = this.state.rate;
    let fee = this.calculateFee(baseAmount);

    if (orderSide === 'sell') {
      fee = fee * rate;
    }

    const quote = Number((baseAmount * rate - fee).toFixed(8));

    const inputError = !this.checkBaseAmount(baseAmount);

    this.setState({
      quoteAmount: Math.max(quote, 0),
      baseAmount: baseAmount,
      feeAmount: fee.toFixed(8),
      inputError,
    });
  };

  shouldSubmit = () => {
    const { error, rate } = this.state;

    if (error === false && this.rate !== 'Not found') {
      const state = {
        ...this.state,
        base: this.state.baseAsset.symbol,
        quote: this.state.quoteAsset.symbol,
        isReverseSwap: this.state.baseAsset.isLightning,
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
    });
  }
}

SwapTabWrapper.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  onPress: PropTypes.func,
  fees: PropTypes.object.isRequired,
  rates: PropTypes.object.isRequired,
  limits: PropTypes.object.isRequired,
  currencies: PropTypes.array.isRequired,
};

export default SwapTabWrapper;
