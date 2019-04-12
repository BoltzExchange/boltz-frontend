import React from 'react';
import PropTypes from 'prop-types';
import ReactNotification from 'react-notifications-component';
import MobileNavigationBar from '../../components/navigationbar/mobilenavigationbar';
import withLandingPageState from '../../hoc/withLandingPageState';
import { bitcoinNetwork, litecoinNetwork } from '../../constants';
import { generateKeys, navigation } from '../../actions';
import { MobileSwapTab } from '../../components/swaptab';
import BackGround from '../../components/background';

const LandingPage = ({
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
}) => (
  <BackGround>
    <ReactNotification ref={notificationDom} />
    <MobileNavigationBar />
    <MobileSwapTab
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
  </BackGround>
);

LandingPage.propTypes = {
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

export default withLandingPageState(LandingPage);
