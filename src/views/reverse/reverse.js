import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../../components/view';
import Prompt from '../../components/prompt';
import Controls from '../../components/controls';
import BackGround from '../../components/background';
import { InputAddress, PayInvoice } from './steps';
import StepsWizard from '../../components/stepswizard';

const styles = () => ({
  wrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ReverseSwap = ({
  classes,
  setReverseSwapAddress,
  startReverseSwap,
  completeSwap,
  goHome,
  swapInfo,
  swapResponse,
  isFetching,
  swapStatus,
}) => {
  return (
    <BackGround>
      <Prompt />
      <View className={classes.wrapper}>
        <StepsWizard
          range={2}
          stage={1}
          onExit={() => {
            if (window.confirm('Are you sure you want to exit')) {
              completeSwap();
              goHome();
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
                <PayInvoice
                  asset={swapInfo.base}
                  invoice={swapResponse.invoice}
                />
              )}
            />
          </StepsWizard.Steps>
          <StepsWizard.Controls>
            <StepsWizard.Control
              num={1}
              render={props => (
                <Controls
                  loading={isFetching}
                  text={'Next'}
                  loadingText={swapStatus}
                  onPress={() => {
                    startReverseSwap(swapInfo, props.nextStage);
                  }}
                />
              )}
            />
            <StepsWizard.Control
              num={2}
              render={() => (
                <Controls
                  loading={isFetching}
                  text={'Done'}
                  loadingText={swapStatus}
                  onPress={() => {
                    goHome();
                  }}
                />
              )}
            />
          </StepsWizard.Controls>
        </StepsWizard>
      </View>
    </BackGround>
  );
};

ReverseSwap.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  goHome: PropTypes.func.isRequired,
  swapInfo: PropTypes.object,
  swapResponse: PropTypes.object,
  completeSwap: PropTypes.func,
  setReverseSwapAddress: PropTypes.func,
  onExit: PropTypes.func,
  nextStage: PropTypes.func,
  startReverseSwap: PropTypes.func.isRequired,
  swapStatus: PropTypes.string.isRequired,
};

export default injectSheet(styles)(ReverseSwap);
