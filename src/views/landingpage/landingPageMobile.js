import React from 'react';
import PropTypes from 'prop-types';
import InjectSheet from 'react-jss';
import ReactNotification from 'react-notifications-component';
import MobileNavigationBar from '../../components/navigationbar/mobilenavigationbar';
import { bitcoinNetwork, litecoinNetwork } from '../../constants';
import { generateKeys, navigation } from '../../actions';
import { MobileSwapTab } from '../../components/swaptab';
import View from '../../components/view';
import BackGround from '../../components/background';
import LandingPageWrapper from './landingPageWrapper';

// TODO: discuss implementing the info modal on mobile

const MobileLandingPageContent = ({
  initSwap,
  classes,
  initReverseSwap,
  notificationDom,
  fees,
  rates,
  limits,
  currencies,
  webln,
  warnings,
}) => {
  const loading = currencies.length === 0;
  return (
    <BackGround>
      <ReactNotification ref={notificationDom} />
      <MobileNavigationBar />
      <View className={classes.intro}>
        <p className={classes.introText}>
          Instant, Account-Free <br />
          & <br />
          Non-Custodial
        </p>
      </View>
      {loading ? (
        <span>LOADING</span>
      ) : (
        <MobileSwapTab
          warnings={warnings}
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
    </BackGround>
  );
};

const styles = theme => ({
  intro: {
    flex: '1 1 content',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  introText: {
    fontSize: '25px',
    textAlign: 'center',
    color: theme.colors.white,
  },
});

MobileLandingPageContent.propTypes = {
  classes: PropTypes.object,
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
  warnings: PropTypes.array,
};

const MobileLandingPage = props => (
  <LandingPageWrapper {...props}>
    {p => <MobileLandingPageContent {...p} />}
  </LandingPageWrapper>
);

export default InjectSheet(styles)(MobileLandingPage);
