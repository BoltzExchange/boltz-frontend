import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import { LinkButton } from '../button';

const boltz_logo = require('../../asset/icons/boltz_logo.png');

const styles = () => ({
  wrapper: {
    height: 'auto',
    width: '100vw',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    marginRight: '10%',
  },
});

const TaskBar = ({ classes }) => (
  <View className={classes.wrapper}>
    <img
      src={boltz_logo}
      height={80}
      width={140}
      className={classes.logo}
      alt="logo"
    />
    <View className={classes.buttons}>
      <LinkButton text="Swap" to="/swap" />
      <LinkButton text="Refund" to="/refund" />
      <LinkButton text="FAQ" to="/faq" />
      <LinkButton text="Blog" to="/blog" />
    </View>
  </View>
);

TaskBar.propTypes = {
  classes: PropTypes.object,
};

export default injectSheet(styles)(TaskBar);
