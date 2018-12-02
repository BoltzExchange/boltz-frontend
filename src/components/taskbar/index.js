import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import { LinkButton } from '../button';

const boltz_logo = require('../../asset/icons/boltz_logo.png');

const styles = theme => ({
  wrapper: {
    height: 'auto',
    width: '100vw',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    marginRight: '10%',
  },
  logo: {
    width: 'auto',
    height: 'auto',
    margin: '20px',
    alignItems: 'baseline',
    justifyContent: 'space-between',
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
  },
});

const TaskBar = ({ classes }) => (
  <View className={classes.wrapper}>
    <View className={classes.logo}>
      <img
        src={boltz_logo}
        height={38}
        width={38}
        className={classes.img}
        alt="logo"
      />
      <span className={classes.logoText}>Boltz</span>
      <span className={classes.subLogoText}>ALPHA</span>
    </View>
    <View className={classes.buttons}>
      <LinkButton text="Swap" to="/" />
      <LinkButton text="Refund" to="/refund" />
      <LinkButton text="FAQ" to="/faq" />
      <LinkButton
        external
        text="Source"
        to="https://github.com/BoltzExchange"
      />
    </View>
  </View>
);

TaskBar.propTypes = {
  classes: PropTypes.object,
};

export default injectSheet(styles)(TaskBar);
