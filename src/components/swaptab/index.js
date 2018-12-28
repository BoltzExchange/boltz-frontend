import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import Input from '../input';
import DropDown from '../dropdown';
import Text, { InfoText } from '../text';
import { MdArrowForward } from 'react-icons/md';
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
  controls: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    color: theme.colors.white,
    fontWeight: '300',
  },
  nextError: {
    color: theme.colors.lightGrey,
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
  nextErrorIcon: {
    fontSize: theme.fontSize.sizeXL,
    padding: '10px',
    color: theme.colors.lightGrey,
  },
  text: {
    fontSize: '20px',
  },
});

class SwapTab extends React.Component {
  rate = {};
  quoteAmount = 0;

  state = {
    error: false,
    base: 'LTC',
    quote: 'BTC',
    baseAmount: MIN,
    quoteAmount: 0,
  };

  setSwapData = baseAmount => {
    if (baseAmount <= MAX && baseAmount >= MIN) {
      this.setState({
        baseAmount,
        quoteAmount: this.calculateQuoteAmount(baseAmount),
        error: false,
      });
    } else {
      this.setState({
        error: true,
      });
    }
  };

  shouldSubmit = () => {
    const { error } = this.state;

    if (error !== undefined && this.rate !== 'Not found') {
      const state = {
        ...this.state,
        pair: this.rate.pair,
      };

      if (this.state.quoteAmount === 0) {
        this.props.onPress({
          ...state,
          quoteAmount: this.quoteAmount,
        });
      } else {
        this.props.onPress(state);
      }
    }
  };

  getRate = (rates, pairId) => {
    const rate = rates[pairId];

    if (rate) {
      this.rate = rate;
      return rate.rate.toFixed(5);
    } else {
      return 'Not found';
    }
  };

  calculateQuoteAmount = baseAmount => {
    return (Number.parseFloat(baseAmount) * this.rate.rate).toFixed(8);
  };

  render() {
    const { classes, rates, currencies } = this.props;
    let { error, base, quote, baseAmount, quoteAmount } = this.state;

    if (quoteAmount === 0) {
      this.quoteAmount = this.calculateQuoteAmount(baseAmount);
      quoteAmount = this.quoteAmount;
    }

    return (
      <View className={classes.wrapper}>
        <View className={classes.stats}>
          <InfoText title="Min amount:" text={`${MIN}`} />
          <InfoText title="Max amount:" text={`${MAX}`} />
          <InfoText title="Fee:" text={'0'} />
          <InfoText
            title="Rate:"
            text={`${this.getRate(rates, `${base}/${quote}`)}`}
          />
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
              onChange={e => this.setSwapData(e)}
            />
            <DropDown
              defaultValue={base}
              fields={currencies}
              onChange={e => this.setState({ base: e })}
            />
          </View>
          <View className={classes.select}>
            <Text text="You receive:" className={classes.text} />
            <Input disable value={quoteAmount} />
            <DropDown
              defaultValue={quote}
              fields={currencies}
              onChange={e => this.setState({ quote: e })}
            />
          </View>
        </View>
        <View
          className={classes.next}
          onClick={error ? null : () => this.shouldSubmit()}
        >
          <View className={classes.controls}>
            <h1 className={error ? classes.nextError : classes.nextText}>
              Start swap
            </h1>
          </View>
          <MdArrowForward
            className={error ? classes.nextErrorIcon : classes.nextIcon}
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
};

export default injectSheet(styles)(SwapTab);
