import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import Input from '../input';
import DropDown from '../dropdown';
import Text, { InfoText } from '../text';
import { MIN, MAX } from '../../constants/fees';
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

const SwapTab = ({ classes, onClick }) => (
  <View className={classes.wrapper}>
    <View className={classes.stats}>
      <InfoText title="min:" text={`${MIN} BTC`} />
      <InfoText title="max:" text={`${MAX} BTC`} />
      <InfoText title="fee:" text="0.0001 BTC" />
      <InfoText title="rate:" text="1 BTC = 1 BTC" />
    </View>
    <View className={classes.options}>
      <View className={classes.select}>
        <Text text="You send:" className={classes.text} />
        <Input min={MIN} max={MAX} step={0.001} />
        <DropDown fields={types} />
      </View>
      <View className={classes.select}>
        <Text text="You receive:" className={classes.text} />
        <Input disable value={100} />
        <DropDown fields={types} />
      </View>
    </View>
    <View className={classes.next} onClick={() => onClick()}>
      <Text text="Start swap" className={classes.nextText} />
      <FaArrowRight className={classes.icon} />
    </View>
  </View>
);
SwapTab.propTypes = {
  classes: PropTypes.object,
  onClick: PropTypes.func,
};

export default injectSheet(styles)(SwapTab);
