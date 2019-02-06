import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { requestProvider } from 'webln';
import BackGround from '../../components/background';
import View from '../../components/view';
import { LinkButton } from '../../components/button';
import TaskBar from '../../components/taskbar';
import SwapTab from '../../components/swaptab';
import { bitcoinNetwork, litecoinNetwork } from '../../constants';
import { generateKeys } from '../../action';
import ModalComponent from '../../components/modal';

const boltz_logo = require('../../asset/icons/boltz_logo.png');

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

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    this.props.getPairs(() => {
      this.forceUpdate();
    });

    try {
      requestProvider().then(provider => {
        this.webln = provider;
      });
    } catch (error) {
      console.log(`Could not enable webln: ${error}`);
    }
  }

  toggleModal = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  };

  render() {
    const {
      classes,
      goHome,
      goReverseSwap,
      goSwap,
      goRefund,
      initSwap,
      initReverseSwap,
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
            <LinkButton text="WHY?" onPress={() => this.toggleModal()} />
            <ModalComponent
              isOpen={this.state.isOpen}
              onClose={this.toggleModal}
            />
          </View>
          {Object.keys(rates).length === 0 || currencies.length === 0 ? (
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
            <SwapTab
              onPress={state => {
                const keys = generateKeys(
                  state.base === 'BTC' ? bitcoinNetwork : litecoinNetwork
                );

                if (state.isReverseSwap) {
                  initReverseSwap({
                    ...state,
                    keys,
                    webln: this.webln,
                  });

                  goReverseSwap();
                } else {
                  initSwap({
                    ...state,
                    keys,
                    webln: this.webln,
                  });

                  goSwap();
                }
              }}
              rates={rates}
              currencies={currencies}
            />
          )}
        </View>
      </BackGround>
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
  goHome: PropTypes.func.isRequired,
  goSwap: PropTypes.func.isRequired,
  goReverseSwap: PropTypes.func.isRequired,
  goRefund: PropTypes.func.isRequired,
  initSwap: PropTypes.func.isRequired,
  initReverseSwap: PropTypes.func.isRequired,
  getPairs: PropTypes.func.isRequired,
  rates: PropTypes.object.isRequired,
  currencies: PropTypes.array.isRequired,
};

export default injectSheet(styles)(LandingPage);
