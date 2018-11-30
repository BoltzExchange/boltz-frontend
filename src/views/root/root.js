import React from 'react';
import PropTypes from 'prop-types';
import * as routes from '../../constants/routes';
import Container from '../../components/container';
import Swap from '../swap';
import Refund from '../refund';
import LandingPage from '../landingpage';

const Root = ({ route }) => {
  return (
    <Container>
      {route === routes.home && <LandingPage />}
      {route === routes.swap && <Swap />}
      {route === routes.refund && <Refund />}
    </Container>
  );
};

Root.propTypes = {
  route: PropTypes.string.isRequired,
};

export default Root;
