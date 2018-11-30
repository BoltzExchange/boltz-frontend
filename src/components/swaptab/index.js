import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import Input from '../input';
import DropDown from '../dropdown';
import Text, { InfoText } from '../text';
import { MIN, MAX, FEE } from '../../constants/fees';
import { FaArrowRight } from 'react-icons/fa';

const types = ['BTC', 'T-BTC'];

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
  state = {
    sent: 0,
    received: 0,
    error: false,
  };

  setSwapData = sent => {
    if (sent > MAX || sent < MIN) {
      this.setState({
        error: true,
      });
    } else {
      this.setState({
        sent,
        received: Number.parseFloat(sent - FEE).toFixed(4),
        error: false,
      });
    }
  };

  shouldSubmit = () => {
    const { error, sent, received } = this.state;
    if (!error && sent !== 0) {
      this.props.onPress(sent, received);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <View className={classes.wrapper}>
        <View className={classes.stats}>
          <InfoText title="min:" text={`${MIN} BTC`} />
          <InfoText title="max:" text={`${MAX} BTC`} />
          <InfoText title="fee:" text={`${FEE} BTC`} />
          <InfoText title="rate:" text="1 BTC = 1 BTC" />
        </View>
        <View className={classes.options}>
          <View className={classes.select}>
            <Text text="You send:" className={classes.text} />
            <Input
              min={MIN}
              max={MAX}
              step={0.001}
              error={this.state.error}
              onChange={e => this.setSwapData(e)}
            />
            <DropDown fields={types} />
          </View>
          <View className={classes.select}>
            <Text text="You receive:" className={classes.text} />
            <Input disable value={this.state.received} />
            <DropDown fields={types} />
          </View>
        </View>
        <View className={classes.next} onClick={() => this.shouldSubmit()}>
          <Text text="Start swap" className={classes.nextText} />
          <FaArrowRight className={classes.icon} />
        </View>
      </View>
    );
  }
}

SwapTab.propTypes = {
  classes: PropTypes.object,
  onPress: PropTypes.func,
};

export default injectSheet(styles)(SwapTab);
