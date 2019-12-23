import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import Button from '../button';
import { navigation } from '../../actions';
import { network, boltzOnion } from '../../constants';

const boltz_logo = require('../../asset/icons/boltz_logo.png');

const DeskTopNavigationBar = ({ classes }) => (
  <View className={classes.wrapper}>
    <View className={classes.logo} onClick={() => navigation.navHome()}>
      <img
        src={boltz_logo}
        height={40}
        width={40}
        className={classes.img}
        alt="logo"
      />
      <span className={classes.logoText}>Boltz</span>
      <span className={classes.subLogoText}>{network} beta</span>
    </View>
    <View className={classes.buttons}>
      <Button
        className={classes.responsiveBtn}
        text="Swap"
        onPress={() => navigation.navHome()}
      />
      <Button
        className={classes.responsiveBtn}
        text="Refund"
        onPress={() => navigation.navRefund()}
      />
      <Button
        className={classes.responsiveBtn}
        text="FAQ"
        onPress={() => navigation.navFaq()}
      />
      <Button
        className={classes.responsiveBtn}
        external
        text="Onion URL"
        to={boltzOnion}
      />
      <Button
        className={classes.responsiveBtn}
        external
        text="Twitter"
        to="https://twitter.com/boltzhq"
      />
      <Button
        className={classes.responsiveBtn}
        external
        text="API"
        to="https://docs.boltz.exchange/en/latest/"
      />
      <Button
        className={classes.responsiveBtn}
        external
        text="Github"
        to="https://github.com/BoltzExchange"
      />
    </View>
  </View>
);

const styles = theme => ({
  wrapper: {
    flex: '1 1 content',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 425px)': {
      flexDirection: 'column',
    },
  },
  buttons: {
    marginRight: '10%',
    '@media (max-width: 425px)': {
      marginRight: '0%',
      justifyContent: 'space-around',
    },
  },
  logo: {
    width: 'auto',
    height: 'auto',
    margin: '20px',
    cursor: 'pointer',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  responsiveBtn: {
    '@media (max-width: 320px)': {
      fontSize: '20px',
    },
  },
  img: {
    alignSelf: 'center',
  },
  logoText: {
    color: theme.colors.white,
    fontSize: '38px',
    fontfamily: 'SFProText',
    margin: '2px',
    fontWeight: '400',
  },
  subLogoText: {
    color: theme.colors.white,
    fontSize: '15px',
    fontWeight: '100',
    textTransform: 'uppercase',
  },
});

DeskTopNavigationBar.propTypes = {
  classes: PropTypes.object,
};

export default injectSheet(styles)(DeskTopNavigationBar);
