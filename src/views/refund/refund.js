import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { FaArrowRight } from 'react-icons/fa';
import Background from '../../components/background';
import StepsWizard from '../../components/stepswizard';
import View from '../../components/view';
import { StepOne, StepTwo, StepFour } from './steps';

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

class Refund extends React.Component {
  UNSAFE_componentWillMount() {
    this.props.toggleRefundMode();
  }

  componentWillUnmount() {
    this.props.toggleRefundMode();
  }

  render() {
    const { classes, inRefundMode, push } = this.props;
    return (
      <Background>
        <View className={classes.wrapper}>
          <StepsWizard
            dark={true}
            range={4}
            stage={1}
            alertOnExit={inRefundMode}
            onExit={() => {
              push('/');
            }}
            message={'Are you sure?'}
          >
            <StepsWizard.Steps>
              <StepsWizard.Step num={1} render={() => <StepOne />} />
              <StepsWizard.Step num={2} render={() => <StepTwo />} />
              <StepsWizard.Step num={3} render={() => <StepTwo />} />
              <StepsWizard.Step num={4} render={() => <StepFour />} />
            </StepsWizard.Steps>
            <StepsWizard.Controls>
              <StepsWizard.Control
                num={1}
                render={() => <Controls text={'Next'} />}
              />
              <StepsWizard.Control
                num={2}
                render={() => <Controls text={'Waiting...'} />}
              />
              <StepsWizard.Control
                num={3}
                render={() => <Controls text={'File Refund'} />}
              />
              <StepsWizard.Control
                num={4}
                render={() => <Controls text={'Show Refund Transaction'} />}
              />
            </StepsWizard.Controls>
          </StepsWizard>
        </View>
      </Background>
    );
  }
}

Refund.propTypes = {
  classes: PropTypes.object,
  push: PropTypes.func,
  inRefundMode: PropTypes.bool,
  toggleRefundMode: PropTypes.func,
};

export default injectSheet(styles)(Refund);
