import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import BackGround from '../../components/background';
import View from '../../components/view';
import { LinkButton } from '../../components/button';
import TaskBar from '../../components/taskbar';
import SwapTab from '../../components/swaptab';
import Networks from '../../constants/networks';

const styles = theme => ({
  wrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  infoWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSize.sizeXXL,
    color: theme.colors.white,
    '@media (min-width: 1500px)': {
      fontSize: theme.fontSize.sizeXXXL,
    },
  },
  description: {
    fontSize: theme.fontSize.sizeXXL,
    '@media (min-width: 1500px)': {
      fontSize: theme.fontSize.sizeXXXL,
    },
  },
});

class LandingPage extends React.Component {
  componentDidMount() {
    this.props.getPairs(() => {
      this.forceUpdate();
    });
  }

  render() {
    const {
      classes,
      setPublicKey,
      goHome,
      goSwap,
      goRefund,
      setSwapAmount,
      rates,
      currencies,
    } = this.props;

    return (
      <BackGround>
        <TaskBar goRefund={goRefund} goHome={goHome} />
        <View className={classes.wrapper}>
          <View className={classes.infoWrapper}>
            <p className={classes.title}>
              Instant, Low Fee & <br /> Non-Custodial.
            </p>
            <p className={classes.description}>
              Trading <br />
              <b>{`Shouldn't`}</b>
              <br />
              Require
              <br />
              An Account.
            </p>
            <LinkButton text="WHY?" onPress={() => window.alert('WIP')} />
          </View>
          <SwapTab
            onPress={state => {
              setSwapAmount(state);
              setPublicKey(Networks.bitcoinMainnet);
              goSwap();
            }}
            rates={rates}
            currencies={currencies}
          />
        </View>
      </BackGround>
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
  setPublicKey: PropTypes.func.isRequired,
  goHome: PropTypes.func.isRequired,
  goSwap: PropTypes.func.isRequired,
  goRefund: PropTypes.func.isRequired,
  setSwapAmount: PropTypes.func.isRequired,
  getPairs: PropTypes.func.isRequired,
  rates: PropTypes.object.isRequired,
  currencies: PropTypes.array.isRequired,
};

export default injectSheet(styles)(LandingPage);
