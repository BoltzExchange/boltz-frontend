import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import Input from '../input';
import DropDown from '../dropdown';
import Controls from '../controls';
import Text, { InfoText } from '../text';
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
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  nextText: {
    flex: 1,
    textAlign: 'center',
    fontSize: '30px',
    color: theme.colors.white,
  },
  icon: {
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
});

class SwapTab extends React.Component {
  rate = 0;

  state = {
    error: false,
    base: 'LTC',
    quote: 'BTC',
    baseAmount: 0.001,
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
    const { error, sent } = this.state;

    if (!error && sent !== 0) {
      this.props.onPress(this.state);
    }
  };

  getRate = (rates, pairId) => {
    const rate = rates[pairId];

    if (rate) {
      return rate;
    } else {
      return 'Not found';
    }
  };

  calculateQuoteAmount = baseAmount => {
    return (Number.parseFloat(baseAmount) * this.rate).toFixed(8);
  };

  render() {
    const { classes, rates, currencies } = this.props;
    let { error, base, quote, baseAmount, quoteAmount } = this.state;

    this.rate = this.getRate(rates, `${base}/${quote}`);

    if (quoteAmount === 0) {
      quoteAmount = this.calculateQuoteAmount(baseAmount);
    }

    return (
      <View className={classes.wrapper}>
        <View className={classes.stats}>
          <InfoText title="Min amount:" text={`${MIN}`} />
          <InfoText title="Max amount:" text={`${MAX}`} />
          <InfoText title="Fee:" text={'0'} />
          <InfoText title="Rate:" text={`${this.rate}`} />
        </View>
        <View className={classes.options}>
          <View className={classes.select}>
            <Text text="You send:" className={classes.text} />
            <Input
              min={MIN}
              max={MAX}
              step={0.0001}
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
        <View className={classes.next}>
          <Controls text={'Start swap'} onPress={() => this.shouldSubmit()} />
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
