import React from 'react';
import PropTypes from 'prop-types';
import ReactNotification from 'react-notifications-component';
import MobileNavigationBar from '../../components/navigationbar/mobilenavigationbar';
import { bitcoinNetwork, litecoinNetwork } from '../../constants';
import { generateKeys, navigation } from '../../actions';
import { MobileSwapTab } from '../../components/swaptab';
import BackGround from '../../components/background';
import LandingPageWrapper from './landingpagewrapper';

// TODO: toggleModal,
// TODO: isOpen,

const MobileLandingPageContent = ({
  initSwap,
  initReverseSwap,
  notificationDom,
  fees,
  rates,
  limits,
  currencies,
  webln,
}) => {
  const loading = currencies.length === 0;
  return (
    <BackGround>
      <ReactNotification ref={notificationDom} />
      <MobileNavigationBar />
      {loading ? (
        <span>LOADING</span>
      ) : (
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
      )}
    </BackGround>
  );
};

MobileLandingPageContent.propTypes = {
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

const MobileLandingPage = props => (
  <LandingPageWrapper {...props}>
    {p => <MobileLandingPageContent {...p} />}
  </LandingPageWrapper>
);

export default MobileLandingPage;
