import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { FaArrowRight } from 'react-icons/fa';
import View from '../../components/view';
import BackGround from '../../components/background';
import StepsWizard from '../../components/stepswizard';
import LandingPage from '../../components/landingpage';
import { StepOne, StepTwo, StepThree, StepFour } from './steps';

const styles = () => ({
  wrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

const Controls = ({ text }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ color: '#fff', fontWeight: '300' }}>{text}</h1>
    </View>
    <FaArrowRight size={30} color={'#FFF'} style={{ paddingRight: '10px' }} />
  </View>
);

Controls.propTypes = {
  text: PropTypes.string,
};

const Swap = ({
  classes,
  inSwapMode,
  toggleSwapMode,
  setSwapAmount,
  swapInfo,
}) => {
  return (
    <BackGround>
      <View className={classes.wrapper}>
        {inSwapMode ? (
          <StepsWizard
            range={4}
            stage={1}
            onExit={() => {
              const x = window.confirm('Sure you want to exit');
              if (x) {
                setSwapAmount(null, null);
                toggleSwapMode();
              }
            }}
            alertOnExit={inSwapMode}
            message={'Are you sure?'}
          >
            <StepsWizard.Steps>
              <StepsWizard.Step
                num={1}
                render={() => <StepOne value={swapInfo.received} />}
              />
              <StepsWizard.Step
                num={2}
                render={() => <StepTwo value={swapInfo.sent} />}
              />
              <StepsWizard.Step num={3} render={() => <StepThree />} />
              <StepsWizard.Step num={4} render={() => <StepFour />} />
            </StepsWizard.Steps>
            <StepsWizard.Controls>
              <StepsWizard.Control
                num={1}
                render={() => <Controls text={'Fee: 0.0001 T-BTC'} />}
              />
              <StepsWizard.Control
                num={2}
                render={() => <Controls text={'Next'} />}
              />
              <StepsWizard.Control
                num={3}
                render={() => <Controls text={'Next'} />}
              />
              <StepsWizard.Control
                num={4}
                render={() => <Controls text={'Download Refund JSON'} />}
              />
            </StepsWizard.Controls>
          </StepsWizard>
        ) : (
          <LandingPage
            toggleSwapMode={toggleSwapMode}
            setSwapAmount={setSwapAmount}
          />
        )}
      </View>
    </BackGround>
  );
};

Swap.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  inSwapMode: PropTypes.bool.isRequired,
  swapInfo: PropTypes.object,
  toggleSwapMode: PropTypes.func,
  setSwapAmount: PropTypes.func,
};

export default injectSheet(styles)(Swap);
