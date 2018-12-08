import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { generateKeys } from '../../action';
import View from '../../components/view';
import BackGround from '../../components/background';
import StepsWizard from '../../components/stepswizard';
import Controls from '../../components/controls';
import { FEE } from '../../constants/fees';
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
}) => {
  return (
    <BackGround>
      <View className={classes.wrapper}>
        <StepsWizard
          range={4}
          stage={1}
          onExit={() => {
            if (window.confirm('Sure you want to exit')) {
              completeSwap();
              goHome();
            }
          }}
        >
          <StepsWizard.Steps>
            <StepsWizard.Step
              num={1}
              render={() => (
                <StepOne value={swapInfo} onChange={setSwapInvoice} />
              )}
            />
            <StepsWizard.Step
              num={2}
              render={() => (
                <StepTwo
                  value={swapInfo}
                  address={swapResponse.address}
                  link={swapResponse.bip21}
                />
              )}
            />
            <StepsWizard.Step
              num={3}
              render={() => (
                <StepThree
                  address={swapResponse.address}
                  redeemScript={swapResponse.redeemScript}
                  currency={swapInfo.sentCurrency}
                  privateKey={generateKeys.getPrivateKey(swapInfo.publicKey)}
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
                  text={`Fee: ${FEE} ${swapInfo.sentCurrency}`}
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
                <Controls text={'Next'} onPress={() => props.nextStage()} />
              )}
            />
            <StepsWizard.Control
              num={4}
              render={props => (
                <Controls
                  text={'Successfully completed swap!'}
                  onPress={() => props.onExit()}
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
  inSwapMode: PropTypes.bool.isRequired,
  goHome: PropTypes.func.isRequired,
  swapInfo: PropTypes.object,
  swapResponse: PropTypes.object,
  completeSwap: PropTypes.func,
  setSwapInvoice: PropTypes.func,
  onExit: PropTypes.func,
  nextStage: PropTypes.func,
  startSwap: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default injectSheet(styles)(Swap);
