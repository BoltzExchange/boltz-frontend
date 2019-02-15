import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { BigNumber } from 'bignumber.js';
import { MdCompareArrows } from 'react-icons/md';
import View from '../view';
import Input from '../input';
import DropDown from '../dropdown';
import Controls from '../controls';
import Text, { InfoText } from '../text';
import { decimals } from '../../scripts/utils';
import { MIN, MAX } from '../../constants/fees';

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
  },
  stats: {
    backgroundColor: theme.colors.white,
    height: '15%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  options: {
    height: '70%',
    width: '100%',
    flexDirection: 'column',
  },
  select: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  next: {
    backgroundColor: theme.colors.matisseBlue,
    height: '15%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  nextError: {
    backgroundColor: theme.colors.tundoraGrey,
    height: '15%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    flex: 2,
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

    this.state = {
      error: false,
      inputError: false,
      base: 'LTC',
      quote: 'BTC ⚡',
      minAmount: 0,
      maxAmount: 0,
      baseAmount: 0.001,
      quoteAmount: 0,
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
      () => this.updateQuoteAmount(this.state.baseAmount)
    );
  };

  componentDidUpdate = (_, prevState) => {
    // Update the rate if the request finished or the currencies changed
    if (
      prevState.base !== this.state.base ||
      prevState.quote !== this.state.quote
    ) {
      const symbol = this.getSymbol();

      // Swapping from chain to chain or from Lightning to Lightning is not supported right now
      if (
        this.state.base === this.state.quote ||
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

      const rate = this.props.rates[symbol];
      const limits = this.props.limits[symbol];

      console.log(this.props);

      this.setState(
        {
          rate,
          minAmount: limits.minimal,
          maxAmount: limits.maximal,
          error: false,
        },
        () => this.updateQuoteAmount(this.state.baseAmount)
      );
    }
  };

  checkBaseAmount = baseAmount => {
    return baseAmount <= MAX && baseAmount >= MIN;
  };

  updatePair = (quote, base) => {
    this.setState({ base, quote, error: false, errorMessage: '' });
  };

  updateBaseAmount = quoteAmount => {
    const rate = new BigNumber(this.state.rate.rate);
    const newBaseAmount = new BigNumber(quoteAmount).dividedBy(rate).toFixed(8);
    const inputError = !this.checkBaseAmount(newBaseAmount);

    this.setState({
      quoteAmount: Number.parseFloat(quoteAmount),
      baseAmount: newBaseAmount,
      inputError,
    });
  };

  updateQuoteAmount = baseAmount => {
    const rate = new BigNumber(this.state.rate.rate);
    const newQuoteAmount = new BigNumber(baseAmount).times(rate).toFixed(8);
    const inputError = !this.checkBaseAmount(baseAmount);

    this.setState({
      quoteAmount: newQuoteAmount,
      baseAmount: Number.parseFloat(baseAmount),
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
        pair: rate.pair,
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
      error,
      base,
      quote,
      minAmount,
      maxAmount,
      baseAmount,
      quoteAmount,
      errorMessage,
      inputError,
    } = this.state;

    return (
      <View className={classes.wrapper}>
        <View className={classes.stats}>
          <InfoText title="Min amount:" text={`${minAmount}`} />
          <InfoText title="Max amount:" text={`${maxAmount}`} />
          <InfoText title="Fee:" text={'0'} />
          <InfoText title="Rate:" text={`${this.parseRate(rates)}`} />
        </View>
        <View className={classes.options}>
          <View className={classes.select}>
            <Text text="You send:" className={classes.text} />
            <Input
              min={minAmount}
              max={maxAmount}
              step={0.001}
              error={inputError}
              value={baseAmount}
              onChange={e => this.updateQuoteAmount(e)}
            />
            <DropDown
              defaultValue={base}
              fields={currencies}
              onChange={e => this.updatePair(quote, e)}
            />
          </View>
          <MdCompareArrows
            className={classes.arrows}
            onClick={() => {
              console.log(base);
              console.log(quote);
              this.setState({
                base: quote,
                quote: base,
              });
            }}
          />
          <View className={classes.select}>
            <Text text="You receive:" className={classes.text} />
            <Input
              min={1 / decimals}
              max={Number.MAX_SAFE_INTEGER}
              step={1 / decimals}
              error={inputError}
              value={quoteAmount}
              onChange={e => this.updateBaseAmount(e)}
            />
            <DropDown
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
            errorRender={() => {}}
          />
        </View>
      </View>
    );
  }
}

SwapTab.propTypes = {
  classes: PropTypes.object,
  onPress: PropTypes.func,
  rates: PropTypes.object.isRequired,
  currencies: PropTypes.array.isRequired,
  limits: PropTypes.object.isRequired,
};

export default injectSheet(styles)(SwapTab);
