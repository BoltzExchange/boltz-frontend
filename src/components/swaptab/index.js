import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import Input from '../input';
import DropDown from '../dropdown';
import Text, { InfoText } from '../text';
import { MIN, MAX, FEE } from '../../constants/fees';
import Controls from '../controls';

const boltz_logo = require('../../asset/icons/boltz_logo.png');

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
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    width: '600px',
    backgroundColor: theme.colors.white,
    '@media (min-width: 1500px)': {
      width: '800px',
      height: '600px',
    },
  },
  loadingLogo: {
    width: '200px',
    height: '200px',
  },
});

class SwapTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      base: 'LTC',
      quote: 'BTC',
      baseAmount: MIN,
      quoteAmount: 0,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    // Update the rate if the request finished or the currencies changed
    if (
      prevProps.loading ||
      prevState.base !== this.state.base ||
      prevState.quote !== this.state.quote
    ) {
      this.setState({
        rate: this.props.rates[`${this.state.base}/${this.state.quote}`],
      });
    }
  };

  checkBaseAmount = baseAmount => {
    const valid = baseAmount <= MAX && baseAmount >= MIN;

    if (!valid) {
      this.setState({
        error: true,
      });
    }
    return valid;
  };

  updateBaseAmount = quoteAmount => {
    const newBaseAmount = (quoteAmount / this.state.rate.rate).toFixed(8);

    if (this.checkBaseAmount(newBaseAmount)) {
      this.setState({
        quoteAmount: Number.parseFloat(quoteAmount).toFixed(8),
        baseAmount: newBaseAmount,
        error: false,
      });
    }
  };

  updateQuoteAmount = baseAmount => {
    const newQuoteAmount = (baseAmount * this.state.rate.rate).toFixed(8);

    if (this.checkBaseAmount(baseAmount)) {
      this.setState({
        quoteAmount: newQuoteAmount,
        baseAmount: Number.parseFloat(baseAmount).toFixed(8),
        error: false,
      });
    }
  };

  shouldSubmit = () => {
    const { error, rate } = this.state;

    if (error === false && this.rate !== 'Not found') {
      const state = {
        ...this.state,
        pair: rate.pair,
      };

      this.props.onPress(state);
    }
  };

  getRate = () => {
    const rate = this.state.rate;

    if (rate) {
      return rate.rate.toFixed(5);
    } else {
      return 'Not found';
    }
  };

  render() {
    const { classes, rates, currencies, loading } = this.props;
    let { error, base, quote, baseAmount, quoteAmount, rate } = this.state;

    if (quoteAmount === 0 && rate !== undefined) {
      this.updateQuoteAmount(baseAmount);
    }

    return loading ? (
      <View className={classes.loading}>
        <img
          src={boltz_logo}
          height={100}
          width={100}
          className={classes.loadingLogo}
          alt="logo"
        />
      </View>
    ) : (
      <View className={classes.wrapper}>
        <View className={classes.stats}>
          <InfoText title="Min amount:" text={`${MIN}`} />
          <InfoText title="Max amount:" text={`${MAX}`} />
          <InfoText title="Fee:" text={FEE} />
          <InfoText title="Rate:" text={`${this.getRate(rates)}`} />
        </View>
        <View className={classes.options}>
          <View className={classes.select}>
            <Text text="You send:" className={classes.text} />
            <Input
              min={MIN}
              max={MAX}
              step={MIN}
              error={error}
              value={baseAmount}
              onChange={e => this.updateQuoteAmount(e)}
            />
            <DropDown
              defaultValue={base}
              fields={currencies}
              onChange={e => this.setState({ base: e })}
            />
          </View>
          <View className={classes.select}>
            <Text text="You receive:" className={classes.text} />
            <Input
              min={0.00000001}
              max={MAX}
              step={0.00000001}
              error={error}
              value={quoteAmount}
              onChange={e => this.updateBaseAmount(e)}
            />
            <DropDown
              defaultValue={quote}
              fields={currencies}
              onChange={e => this.setState({ quote: e })}
            />
          </View>
        </View>
        <View className={classes.next}>
          <Controls
            text={'Start swap'}
            loading={error}
            onPress={error ? null : () => this.shouldSubmit()}
            loadingText={'Start swap'}
            loadingStyle={classes.nextText}
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
  loading: PropTypes.bool.isRequired,
};

export default injectSheet(styles)(SwapTab);
