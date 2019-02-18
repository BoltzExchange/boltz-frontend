import React from 'react';
import PropTypes from 'prop-types';
import Faq from '../faq';
import Swap from '../swap';
import Refund from '../refund';
import ReverseSwap from '../reverse';
import LandingPage from '../landingpage';
import * as routes from '../../constants/routes';
import Container from '../../components/container';

const Router = ({ route }) => {
  return (
    <Container>
      {route === routes.faq && <Faq />}
      {route === routes.swap && <Swap />}
      {route === routes.refund && <Refund />}
      {route === routes.home && <LandingPage />}
      {route === routes.reverseSwap && <ReverseSwap />}
    </Container>
  );
};

Router.propTypes = {
  route: PropTypes.string.isRequired,
};

export default Router;
