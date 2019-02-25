import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import Button from '../button';
import { network } from '../../constants';

const boltz_logo = require('../../asset/icons/boltz_logo.png');

const styles = theme => ({
  wrapper: {
    flex: '1 1 content',
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
    cursor: 'pointer',
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
    textTransform: 'uppercase',
  },
});

const TaskBar = ({ classes, goHome, goRefund, goFaq }) => (
  <View className={classes.wrapper}>
    <View className={classes.logo} onClick={() => goHome()}>
      <img
        src={boltz_logo}
        height={38}
        width={38}
        className={classes.img}
        alt="logo"
      />
      <span className={classes.logoText}>Boltz</span>
      <span className={classes.subLogoText}>{network} alpha</span>
    </View>
    <View className={classes.buttons}>
      <Button text="Swap" onPress={() => goHome()} />
      <Button text="Refund" onPress={() => goRefund()} />
      <Button text="FAQ" onPress={() => goFaq()} />
      <Button external text="Github" to="https://github.com/BoltzExchange" />
    </View>
  </View>
);

TaskBar.propTypes = {
  classes: PropTypes.object,
  goHome: PropTypes.func.isRequired,
  goRefund: PropTypes.func.isRequired,
  goFaq: PropTypes.func.isRequired,
};

export default injectSheet(styles)(TaskBar);
