import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { MdCompareArrows } from 'react-icons/md';
import View from '../view';
import Input from '../input';
import DropDown from '../dropdown';
import Controls from '../controls';
import { decimals } from '../../utils';
import Text, { InfoText } from '../text';
import { ServiceWarnings } from '../../constants';

const styles = theme => ({
  wrapper: {
    margin: '15px',
    height: '400px',
    width: '600px',
    flexDirection: 'column',
    backgroundColor: theme.colors.white,
    '@media (min-width: 1500px)': {
      width: '800px',
      height: '600px',
    },
    '@media (max-width: 500px)': {
      width: '100%',
      height: '400px',
    },
  },
  inputMobile: {
    '@media (max-width: 500px)': {
      width: '100px',
      fontSize: '16px',
    },
  },
  stats: {
    backgroundColor: theme.colors.white,
    height: '15%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  options: {
    flex: '1 0 70%',
    flexDirection: 'column',
  },
  select: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  next: {
    backgroundColor: theme.colors.matisseBlue,
    flex: '1 0 15%',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  nextError: {
    backgroundColor: theme.colors.tundoraGrey,
    flex: '1 0 15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    color: theme.colors.white,
    fontWeight: '300',
  },
  nextIcon: {
    fontSize: theme.fontSize.sizeXL,
    padding: '10px',
    transition: '0.3s',
    color: theme.colors.white,
    '&:hover': {
      color: theme.colors.lightGrey,
    },
  },
  text: {
    fontSize: '20px',
  },
  arrows: {
    height: '30px',
    width: '30px',
    marginLeft: '80%',
    cursor: 'pointer',
    transform: 'rotate(90deg)',
    transition: 'none 200ms ease-out',
    transitionProperty: 'color',
    color: theme.colors.tundoraGrey,
    '&:hover': {
      color: theme.colors.hoverGrey,
    },
  },
});

class SwapTab extends React.Component {
  baseAsset = {};
  quoteAsset = {};

  constructor(props) {
    super(props);

    if (props.warnings.includes(ServiceWarnings.ReverseSwapsDisabled)) {
      this.reverseSwapsDisabled = true;
    }

    this.state = {
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

  componentDidMount = () => {
    const symbol = this.getSymbol();
    const limits = this.props.limits[symbol];

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
    const { base, quote } = this.state;

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
          minAmount: limits.minimal / decimals,
          maxAmount: limits.maximal / decimals,
          error: false,
        },
        () => this.updateQuoteAmount(this.state.baseAmount)
      );
    }

    // TODO: Remove this once we resolve the issues
    if (this.quoteAsset.symbol === 'BTC' && !this.quoteAsset.isLightning) {
      if (this.state.errorMessage !== 'Currently not available')
        this.setState({
          error: true,
          errorMessage: 'Currently not available',
        });
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

  render() {
    const { classes, rates, currencies } = this.props;
    const {
      base,
      quote,
      error,
      minAmount,
      maxAmount,
      feeAmount,
      baseAmount,
      inputError,
      quoteAmount,
      errorMessage,
    } = this.state;

    return (
      <View className={classes.wrapper}>
        <View className={classes.stats}>
          <InfoText title="Min amount" text={`${minAmount}`} />
          <InfoText title="Max amount" text={`${maxAmount}`} />
          <InfoText title="Fee" text={`${feeAmount}`} />
          <InfoText title="Rate" text={`${this.parseRate(rates)}`} />
        </View>
        <View className={classes.options}>
          <View className={classes.select}>
            <Text text="You send:" className={classes.text} />
            <Input
              disable={this.state.disabled}
              className={classes.inputMobile}
              min={minAmount}
              max={maxAmount}
              step={0.001}
              error={inputError}
              value={baseAmount}
              onChange={e => this.updateQuoteAmount(e)}
            />
            <DropDown
              className={classes.inputMobile}
              defaultValue={base}
              fields={currencies}
              onChange={e => this.updatePair(quote, e)}
            />
          </View>
          <MdCompareArrows
            className={classes.arrows}
            onClick={() => {
              this.setState({
                base: quote,
                baseAmount: quoteAmount,
                quote: base,
                quoteAmount: baseAmount,
              });
            }}
          />
          <View className={classes.select}>
            <Text text="You receive:" className={classes.text} />
            <Input
              disable={this.state.disabled}
              className={classes.inputMobile}
              min={1 / decimals}
              max={Number.MAX_SAFE_INTEGER}
              step={1 / decimals}
              error={inputError}
              value={quoteAmount}
              onChange={e => this.updateBaseAmount(e)}
            />
            <DropDown
              className={classes.inputMobile}
              defaultValue={quote}
              fields={currencies}
              onChange={e => this.updatePair(e, base)}
            />
          </View>
        </View>
        <View className={classes.next}>
          <Controls
            text={'Start swap'}
            error={error || inputError}
            onPress={error ? () => {} : () => this.shouldSubmit()}
            errorText={inputError ? 'Invalid amount' : errorMessage}
          />
        </View>
      </View>
    );
  }
}

SwapTab.propTypes = {
  classes: PropTypes.object,
  onPress: PropTypes.func,
  warnings: PropTypes.array.isRequired,
  fees: PropTypes.object.isRequired,
  rates: PropTypes.object.isRequired,
  limits: PropTypes.object.isRequired,
  currencies: PropTypes.array.isRequired,
};

export default injectSheet(styles)(SwapTab);
