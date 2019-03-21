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
      fontSize: '24px',
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
      <Button
        className={classes.responsiveBtn}
        text="Swap"
        onPress={() => goHome()}
      />
      <Button
        className={classes.responsiveBtn}
        text="Refund"
        onPress={() => goRefund()}
      />
      <Button
        className={classes.responsiveBtn}
        text="FAQ"
        onPress={() => goFaq()}
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

TaskBar.propTypes = {
  classes: PropTypes.object,
  goHome: PropTypes.func.isRequired,
  goRefund: PropTypes.func.isRequired,
  goFaq: PropTypes.func.isRequired,
};

export default injectSheet(styles)(TaskBar);
