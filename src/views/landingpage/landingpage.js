import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { requestProvider } from 'webln';
import ReactNotification from 'react-notifications-component';
import Link from '../../components/link';
import View from '../../components/view';
import { generateKeys } from '../../action';
import Button from '../../components/button';
import TaskBar from '../../components/taskbar';
import SwapTab from '../../components/swaptab';
import ModalComponent from '../../components/modal';
import BackGround from '../../components/background';
import { bitcoinNetwork, litecoinNetwork } from '../../constants';
import { notificationData, isMobileBrowser } from '../../utils';
import { navigation } from '../../action';
const boltz_logo = require('../../asset/icons/boltz_logo.png');

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
    this.notificationDom = React.createRef();
  }

  componentDidMount = () => {
    if (isMobileBrowser()) {
      window.alert(
        // eslint-disable-next-line max-len
        'We strongly advise against using Boltz on mobile devices as of right now. Please use a desktop or laptop'
      );
    }

    this.props.getPairs();

    try {
      requestProvider().then(provider => {
        this.webln = provider;
      });
    } catch (error) {
      console.log(`Could not enable WebLN: ${error}`);
    }
  };

  componentDidUpdate = () => {
    if (this.props.errorMessage) {
      this.addNotification(this.props.errorMessage, 0);
    }
  };

  addNotification = (info, type) => {
    this.notificationDom.current.addNotification(notificationData(info, type));
  };

  toggleModal = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  };

  render() {
    const {
      classes,
      initSwap,
      initReverseSwap,

      fees,
      rates,
      limits,
      currencies,
    } = this.props;

    const loading = currencies.length === 0;

    return (
      <BackGround>
        <ReactNotification ref={this.notificationDom} />
        <TaskBar />
        <View className={classes.wrapper}>
          <View className={classes.infoWrapper}>
            <p className={classes.title}>
              Instant, Account-Free & <br /> Non-Custodial.
            </p>
            <p className={classes.description}>
              Trading <br />
              <b>{`Shouldn't`}</b>
              <br />
              Require
              <br />
              An Account.
            </p>
            <Button text="WHY?" onPress={() => this.toggleModal()} />
            <ModalComponent
              isOpen={this.state.isOpen}
              onClose={this.toggleModal}
            >
              <ModalContent />
            </ModalComponent>
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

                  navigation.navReverseSwap();
                } else {
                  initSwap({
                    ...state,
                    keys,
                    webln: this.webln,
                  });

                  navigation.navSwap();
                }
              }}
              fees={fees}
              rates={rates}
              limits={limits}
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
  initSwap: PropTypes.func.isRequired,
  initReverseSwap: PropTypes.func.isRequired,
  getPairs: PropTypes.func.isRequired,

  fees: PropTypes.object.isRequired,
  rates: PropTypes.object.isRequired,
  limits: PropTypes.object.isRequired,
  currencies: PropTypes.array.isRequired,

  errorMessage: PropTypes.object,
};

const ModalContent = () => (
  <View style={{ fontSize: '20px' }} noFlex>
    <p>
      On 4th of September 2018, in a{' '}
      <Link
        to={
          'https://info.shapeshift.io/blog/2018/09/04/introducing-shapeshift-membership/'
        }
        text={'blogpost'}
      />
      , Shapeshift, one of the largest cryptocurrency entities, scummed to user
      data collection.
    </p>
    <p>
      By creating an account on a custodial exchange like Shapeshift, you are
      giving the government and anyone who can access that KYC data, the power
      to not only know that you have crypto assets but also to confiscate them
      during a trade.
    </p>
    <p>
      We built Boltz with a dream of a fairer financial world, with the primary
      goal to empower users with financial sovereignty. Therefore,{' '}
      <b>
        Boltz does not and will never collect any data that could identify our
        users.
      </b>
    </p>
    <p>
      Also, Boltz leverages atomic swaps in a way, so that trades either
      complete in full or get refunded. Users can rest assured to be in
      possession of their funds at all times, without worrying about who is
      behind Boltz and if this entity is trustworthy.
    </p>
    <p>
      Trading <b>{`shouldn't`}</b> require an account.
    </p>
  </View>
);

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

export default injectSheet(styles)(LandingPage);
