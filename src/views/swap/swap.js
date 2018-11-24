import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { FaArrowRight } from 'react-icons/fa';
import View from '../../components/view';
import BackGround from '../../components/background';
import StepsWizard from '../../components/stepswizard';
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

const Swap = ({ classes, history, inSwapMode, toggleSwapMode }) => {
  if (!inSwapMode) {
    history.replace('/');
  }
  return (
    <BackGround>
      <View className={classes.wrapper}>
        <StepsWizard
          range={4}
          stage={1}
          onExit={() => toggleSwapMode()}
          alertOnExit={inSwapMode}
          // TODO: change state isSwapMode
          message={'Are you sure?'}
        >
          <StepsWizard.Steps>
            <StepsWizard.Step num={1} render={() => <StepOne />} />
            <StepsWizard.Step num={2} render={() => <StepTwo />} />
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
              render={() => <Controls text={'Send'} />}
            />
            <StepsWizard.Control
              num={3}
              render={() => <Controls text={'Download refund JSON'} />}
            />
            <StepsWizard.Control
              num={4}
              render={() => <Controls text={'Download refund JSON'} />}
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
  toggleSwapMode: PropTypes.func,
};

export default injectSheet(styles)(Swap);
