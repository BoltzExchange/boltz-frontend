import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { lostConnection, reconnected } from '../../constants/messages';
import View from '../../components/view';
import Prompt from '../../components/prompt';
import Loading from '../../components/loading';
import Controls from '../../components/controls';
import Confetti from '../../components/confetti';
import BackGround from '../../components/background';
import { getCurrencyName } from '../../utils';
import StepsWizard from '../../components/stepswizard';
import DataStorage from '../reversetimelock/dataStorage';
import { notificationData } from '../../utils';
import { InputAddress, PayInvoice, LockingFunds } from './steps';
import ReactNotification from 'react-notifications-component';
import { navigation } from '../../action';

const styles = () => ({
  wrapper: {
    flex: '1 0 100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class ReverseSwap extends React.Component {
  constructor(props) {
    super(props);
    this.notificationDom = React.createRef();
  }

  componentDidMount = () => {
    this.redirectIfLoggedOut();
  };

  componentDidUpdate(prevProps) {
    const { isReconnecting, swapFailResponse, swapResponse } = this.props;
    this.redirectIfLoggedOut();

    if (isReconnecting && !prevProps.isReconnecting) {
      this.addNotification(lostConnection, 0);
    }
    if (!isReconnecting && prevProps.isReconnecting) {
      this.addNotification(reconnected);
    }

    if (!swapFailResponse && !isReconnecting) {
      this.addNotification(
        {
          title: 'Failed to execute reverse swap',
          message: swapResponse,
        },
        0
      );
    }
  }

  componentWillUnmount = () => {
    this.props.completeSwap();
  };

  addNotification = (message, type) => {
    this.notificationDom.current.addNotification(
      notificationData(message, type)
    );
  };

  redirectIfLoggedOut = () => {
    if (!this.props.inSwapMode) {
      navigation.navHome();
    }
  };

  render() {
    const {
      webln,
      classes,
      swapInfo,
      swapStatus,
      isFetching,
      swapResponse,
      completeSwap,
      invalidAddress,
      startReverseSwap,
      swapFailResponse,
      goTimelockExpired,
      setReverseSwapAddress,
    } = this.props;

    DataStorage.swapInfo = {
      asset: swapInfo.quote,
      amount: swapInfo.quoteAmount,
    };

    if (swapResponse) {
      DataStorage.swapInfo.id = swapResponse.id;
    }

    return (
      <BackGround>
        <ReactNotification ref={this.notificationDom} />
        <Prompt />
        <View className={classes.wrapper}>
          <StepsWizard
            range={4}
            stage={1}
            id={swapResponse ? swapResponse.id : null}
            onExit={() => {
              if (window.confirm('Are you sure you want to exit')) {
                completeSwap();
                navigation.navHome();
              }
            }}
          >
            <StepsWizard.Steps>
              <StepsWizard.Step
                num={1}
                render={() => (
                  <InputAddress
                    swapInfo={swapInfo}
                    onChange={setReverseSwapAddress}
                  />
                )}
              />
              <StepsWizard.Step
                num={2}
                render={() => (
                  <LockingFunds
                    swapInfo={swapInfo}
                    swapResponse={swapResponse}
                  />
                )}
              />
              <StepsWizard.Step
                num={3}
                render={() => (
                  <PayInvoice
                    swapInfo={swapInfo}
                    swapResponse={swapResponse}
                    webln={webln}
                  />
                )}
              />
              <StepsWizard.Step
                num={4}
                render={() => (
                  <Confetti
                    notifie={style => (
                      <span className={style}>
                        You sent {swapInfo.baseAmount} {swapInfo.base} and
                        received {swapInfo.quoteAmount} {swapInfo.quote}
                      </span>
                    )}
                  />
                )}
              />
            </StepsWizard.Steps>
            <StepsWizard.Controls>
              <StepsWizard.Control
                num={1}
                render={props => (
                  <Controls
                    error={invalidAddress}
                    errorText={`Invalid ${getCurrencyName(
                      swapInfo.quote
                    )} address`}
                    errorRender={() => {}}
                    loading={!swapInfo.address && !invalidAddress}
                    loadingText={`Input a valid ${getCurrencyName(
                      swapInfo.quote
                    )} address`}
                    loadingRender={() => {}}
                    text={'Next'}
                    onPress={() => {
                      if (swapInfo.address && swapInfo.address !== '') {
                        startReverseSwap(
                          swapInfo,
                          props.nextStage,
                          goTimelockExpired
                        );
                        props.nextStage();
                      }
                    }}
                  />
                )}
              />
              <StepsWizard.Control
                num={2}
                render={props => (
                  <Controls
                    mobile
                    loading={isFetching}
                    loadingText={'Locking your funds...'}
                    loadingRender={() => <Loading />}
                    error={!swapFailResponse === true}
                    errorAction={() =>
                      startReverseSwap(
                        swapInfo,
                        props.nextStage,
                        goTimelockExpired
                      )
                    }
                    errorText={`Reverse swap failed`}
                  />
                )}
              />
              <StepsWizard.Control
                num={3}
                render={() => (
                  <Controls
                    mobile
                    loading={isFetching}
                    loadingText={swapStatus}
                    loadingRender={() => <Loading />}
                  />
                )}
              />
              <StepsWizard.Control
                num={4}
                render={() => (
                  <Controls
                    text={'Swap Again!'}
                    onPress={() => {
                      completeSwap();
                      navigation.navHome();
                    }}
                  />
                )}
              />
            </StepsWizard.Controls>
          </StepsWizard>
        </View>
      </BackGround>
    );
  }
}

ReverseSwap.propTypes = {
  classes: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isReconnecting: PropTypes.bool.isRequired,
  inSwapMode: PropTypes.bool.isRequired,
  goTimelockExpired: PropTypes.func.isRequired,
  webln: PropTypes.object,
  swapInfo: PropTypes.object,
  swapResponse: PropTypes.object,
  swapFailResponse: PropTypes.bool.isRequired,
  completeSwap: PropTypes.func,
  setReverseSwapAddress: PropTypes.func,
  onExit: PropTypes.func,
  nextStage: PropTypes.func,
  startReverseSwap: PropTypes.func.isRequired,
  swapStatus: PropTypes.string.isRequired,
  invalidAddress: PropTypes.bool.isRequired,
};

export default injectSheet(styles)(ReverseSwap);
