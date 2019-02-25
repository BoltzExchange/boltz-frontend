import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { requestProvider } from 'webln';
import View from '../../components/view';
import { generateKeys } from '../../action';
import TaskBar from '../../components/taskbar';
import SwapTab from '../../components/swaptab';
import ModalComponent from '../../components/modal';
import BackGround from '../../components/background';
import { LinkButton } from '../../components/button';
import { bitcoinNetwork, litecoinNetwork } from '../../constants';

const boltz_logo = require('../../asset/icons/boltz_logo.png');

const styles = theme => ({
  wrapper: {
    flex: '1 0 100%',
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
    width: '600px',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    '@media (min-width: 1500px)': {
      width: '800px',
      height: '600px',
    },
  },
  loadingLogo: {
    width: '200px',
    height: '200px',
    display: 'block',
    marginBottom: '10px',
  },
  loadingText: {
    fontSize: '20px',
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
      this.props.getLimits(this.props.rates, () => {});
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
      goFaq,
      initSwap,
      initReverseSwap,
      rates,
      currencies,
      limits,
    } = this.props;

    const loading =
      Object.keys(rates).length === 0 ||
      currencies.length === 0 ||
      Object.keys(limits).length === 0;

    return (
      <BackGround>
        <TaskBar goHome={goHome} goRefund={goRefund} goFaq={goFaq} />
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
          {loading ? (
            <View className={classes.loading}>
              <img
                alt="logo"
                src={boltz_logo}
                className={classes.loadingLogo}
              />
              <p className={classes.loadingText}>Loading...</p>
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
              limits={limits}
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
  goFaq: PropTypes.func.isRequired,
  initSwap: PropTypes.func.isRequired,
  initReverseSwap: PropTypes.func.isRequired,
  getPairs: PropTypes.func.isRequired,
  getLimits: PropTypes.func.isRequired,
  rates: PropTypes.object.isRequired,
  currencies: PropTypes.array.isRequired,
  limits: PropTypes.object.isRequired,
};

export default injectSheet(styles)(LandingPage);
