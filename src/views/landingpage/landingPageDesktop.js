import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import withLandingPageState from '../../hoc/withLandingPageState';
import ReactNotification from 'react-notifications-component';
import View from '../../components/view';
import { generateKeys, navigation } from '../../actions';
import Button from '../../components/button';
import NavigationBar from '../../components/navigationbar';
import { DeskTopSwapTab } from '../../components/swaptab';
import ModalComponent from '../../components/modal';
import ModalContent from '../../components/modalcontent';
import BackGround from '../../components/background';
import { bitcoinNetwork, litecoinNetwork } from '../../constants';
const boltz_logo = require('../../asset/icons/boltz_logo.png');

const LandingPage = ({
  classes,
  initSwap,
  initReverseSwap,
  fees,
  rates,
  limits,
  currencies,
  notificationDom,
  toggleModal,
  isOpen,
  webln,
}) => {
  const loading = currencies.length === 0;
  return (
    <BackGround>
      <ReactNotification ref={notificationDom} />
      <NavigationBar />
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
          <Button text="WHY?" onPress={() => toggleModal()} />
          <ModalComponent isOpen={isOpen} onClose={toggleModal}>
            <ModalContent />
          </ModalComponent>
        </View>
        {loading ? (
          <View className={classes.loading}>
            <img alt="logo" src={boltz_logo} className={classes.loadingLogo} />
            <p className={classes.loadingText}>Loading...</p>
          </View>
        ) : (
          <DeskTopSwapTab
            onPress={state => {
              const keys = generateKeys(
                state.base === 'BTC' ? bitcoinNetwork : litecoinNetwork
              );

              if (state.isReverseSwap) {
                initReverseSwap({
                  ...state,
                  keys,
                  webln,
                });

                navigation.navReverseSwap();
              } else {
                initSwap({
                  ...state,
                  keys,
                  webln,
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
};

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

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
  initSwap: PropTypes.func.isRequired,
  initReverseSwap: PropTypes.func.isRequired,
  notificationDom: PropTypes.object,
  fees: PropTypes.object.isRequired,
  rates: PropTypes.object.isRequired,
  limits: PropTypes.object.isRequired,
  currencies: PropTypes.array.isRequired,
  toggleModal: PropTypes.func,
  isOpen: PropTypes.bool,
  webln: PropTypes.object,
};

const enhancedLandingPage = withLandingPageState(LandingPage);
export default injectSheet(styles)(enhancedLandingPage);
