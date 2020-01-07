import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { navigation } from '../../actions';
import View from '../../components/view';
import NavigationBar from '../../components/navigationbar';
import Controls from '../../components/controls';
import BackGround from '../../components/background';

const styles = theme => ({
  wrapper: {
    flex: '1 0 100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    margin: '15px',
    height: '400px',
    width: '600px',
    flexDirection: 'column',
    backgroundColor: theme.colors.white,
    '@media (min-width: 1500px)': {
      width: '800px',
    },
  },
  content: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  padding: {
    height: '70%',
    padding: '20px',
  },
  reason: {
    fontSize: '20px',
  },
  retry: {
    backgroundColor: theme.colors.matisseBlue,
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

class ReverseSwapTimelockExpired extends React.Component {
  componentDidMount = () => {
    if (this.props.id === '') {
      navigation.navHome();
    }
  };

  render = () => {
    const { id, asset, amount, classes, dataStorageClear } = this.props;

    return (
      <BackGround>
        <NavigationBar />
        <View className={classes.wrapper}>
          <View className={classes.tab}>
            <View className={classes.padding}>
              <View className={classes.content}>
                <h1>
                  Aw swap! We could not lock your {amount} {asset} for you.
                </h1>
                <p className={classes.reason}>
                  The time lock of the onchain coins expired before they were
                  claimed. Therefore, we refunded the coins back to our platform
                  and aborted the Swap. Please report your Swap ID <i>{id}</i>{' '}
                  <a href={'https://discordapp.com/invite/cq4dkwQ'}>here</a> to{' '}
                  learn further details.
                </p>
              </View>
            </View>
            <View className={classes.retry}>
              <Controls
                text={'Try another Swap'}
                onPress={() => {
                  window.location.reload();
                  dataStorageClear();
                }}
              />
            </View>
          </View>
        </View>
      </BackGround>
    );
  };
}

ReverseSwapTimelockExpired.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  asset: PropTypes.string,
  amount: PropTypes.number,
  dataStorageClear: PropTypes.func.isRequired,
};

export default injectSheet(styles)(ReverseSwapTimelockExpired);
