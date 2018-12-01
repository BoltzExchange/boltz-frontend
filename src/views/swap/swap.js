import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { FaArrowRight } from 'react-icons/fa';
import { generateKeys } from '../../action';
import View from '../../components/view';
import BackGround from '../../components/background';
import StepsWizard from '../../components/stepswizard';
import { StepOne, StepTwo, StepThree, StepFour } from './steps';

const styles = () => ({
  wrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Controls = ({ text, onPress, loading }) => (
  <View
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    onClick={loading ? null : () => onPress()}
  >
    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <h1 style={{ color: '#fff', fontWeight: '300' }}>Loading...</h1>
      ) : (
        <h1 style={{ color: '#fff', fontWeight: '300' }}>{text}</h1>
      )}
    </View>
    <FaArrowRight size={30} color={'#FFF'} style={{ paddingRight: '10px' }} />
  </View>
);

Controls.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
};

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
                <StepOne value={swapInfo.received} onChange={setSwapInvoice} />
              )}
            />
            <StepsWizard.Step
              num={2}
              render={() => (
                <StepTwo value={swapInfo.sent} address={swapResponse.address} />
              )}
            />
            <StepsWizard.Step
              num={3}
              render={() => (
                <StepThree
                  address={swapResponse.address}
                  content={swapResponse}
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
                  text={'Fee: 0.0001 T-BTC'}
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
