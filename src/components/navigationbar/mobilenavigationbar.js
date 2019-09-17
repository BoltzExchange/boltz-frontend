import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import Button from '../button';
import { navigation } from '../../actions';
import { MdMenu } from 'react-icons/md';
const boltz_logo = require('../../asset/icons/boltz_logo.png');

class MobileNavigationBar extends React.Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false,
    };
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      displayMenu: !prevState.displayMenu,
    }));
  };

  render() {
    const { classes } = this.props;
    return (
      <View className={classes.wrapper}>
        <View className={classes.icon}>
          <View className={classes.logo} onClick={() => navigation.navHome()}>
            <img
              src={boltz_logo}
              height={50}
              width={50}
              className={''}
              alt="logo"
            />
            <span className={classes.logoText}>Boltz</span>
          </View>
          <MdMenu
            onClick={() => this.toggleMenu()}
            className={classes.stackMenu}
          />
        </View>
        {this.state.displayMenu ? (
          <View className={classes.dropDownContent}>
            <Button
              className={classes.btn}
              text="Swap"
              onPress={() => navigation.navHome()}
            />
            <Button
              className={classes.btn}
              text="Refund"
              onPress={() => navigation.navRefund()}
            />
            <Button
              className={classes.btn}
              text="FAQ"
              onPress={() => navigation.navFaq()}
            />
            <Button
              className={classes.btn}
              external
              text="Onion URL"
              to="http://boltzzzbnus4m7mta3cxmflnps4fp7dueu2tgurstbvrbt6xswzcocyd.onion/"
            />
            <Button
              className={classes.btn}
              external
              text="Twitter"
              to="https://twitter.com/boltzhq"
            />
            <Button
              className={classes.btn}
              external
              text="Github"
              to="https://github.com/BoltzExchange"
            />
          </View>
        ) : (
          undefined
        )}
      </View>
    );
  }
}

MobileNavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  wrapper: {
    flex: '1 1 content',
    flexDirection: 'column',
    padding: '10px',
  },
  icon: {
    justifyContent: 'space-between',
  },
  display: {
    width: '100%',
    justifyContent: 'space-between',
    margin: '10px',
  },
  logo: {
    width: 'auto',
    height: 'auto',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stackMenu: {
    height: '50px',
    width: '50px',
    cursor: 'pointer',
    color: theme.colors.white,
    '&:hover': {
      color: theme.colors.hoverGrey,
    },
  },
  logoText: {
    color: theme.colors.white,
    fontSize: '38px',
    margin: '2px',
    fontWeight: '400',
  },
  dropDownContent: {
    flexDirection: 'column',
    minWidth: '100%',
    zIndex: 1,
  },
  btn: {
    fontSize: '24px',
    alignSelf: 'flex-end',
  },
});

export default injectSheet(styles)(MobileNavigationBar);
