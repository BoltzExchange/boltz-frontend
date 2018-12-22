import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../../components/view';
import BackGround from '../../components/background';
import StepsWizard from '../../components/stepswizard';
import Controls from '../../components/controls';
import Prompt from '../../components/prompt';
import { StepOne, StepTwo, StepThree, StepFour } from './steps';

const styles = () => ({
  wrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Swap = ({
  classes,
  setSwapInvoice,
  completeSwap,
  goHome,
  swapInfo,
  swapResponse,
  startSwap,
  isFetching,
  swapStatus,
}) => {
  return (
    <BackGround>
      <Prompt />
      <View className={classes.wrapper}>
        <StepsWizard
          range={4}
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
                <StepOne swapInfo={swapInfo} onChange={setSwapInvoice} />
              )}
            />
            <StepsWizard.Step
              num={2}
              render={() => (
                <StepTwo swapInfo={swapInfo} swapResponse={swapResponse} />
              )}
            />
            <StepsWizard.Step
              num={3}
              render={() => (
                <StepThree
                  address={swapResponse.address}
                  currency={swapInfo.base}
                  redeemScript={swapResponse.redeemScript}
                  privateKey={swapInfo.keys.privateKey}
                  timeoutBlockHeight={swapResponse.timeoutBlockHeight}
                />
              )}
            />
            <StepsWizard.Step num={4} render={() => <StepFour />} />
          </StepsWizard.Steps>
          <StepsWizard.Controls>
            <StepsWizard.Control
              num={1}
              render={props => (
                <Controls
                  loading={isFetching}
                  text={`Next`}
                  onPress={() => {
                    startSwap(swapInfo, props.nextStage);
                  }}
                />
              )}
            />
            <StepsWizard.Control
              num={2}
              render={props => (
                <Controls text={'Next'} onPress={() => props.nextStage()} />
              )}
            />
            <StepsWizard.Control
              num={3}
              render={props => (
                <Controls
                  text={swapStatus}
                  onPress={() => {
                    if (swapStatus === 'Done') {
                      props.nextStage();
                    }
                  }}
                />
              )}
            />
            <StepsWizard.Control
              num={4}
              render={() => (
                <Controls
                  text={'Successfully completed swap!'}
                  onPress={() => {
                    completeSwap();
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

Swap.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  goHome: PropTypes.func.isRequired,
  swapInfo: PropTypes.object,
  swapResponse: PropTypes.object,
  completeSwap: PropTypes.func,
  setSwapInvoice: PropTypes.func,
  onExit: PropTypes.func,
  nextStage: PropTypes.func,
  startSwap: PropTypes.func.isRequired,
  swapStatus: PropTypes.string.isRequired,
};

export default injectSheet(styles)(Swap);
