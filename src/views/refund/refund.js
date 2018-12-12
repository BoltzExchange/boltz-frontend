import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Controls from '../../components/controls';
import Background from '../../components/background';
import StepsWizard from '../../components/stepswizard';
import Prompt from '../../components/prompt';
import View from '../../components/view';
import { StepOne, StepTwo, StepFour } from './steps';

const styles = () => ({
  wrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Refund extends React.Component {
  UNSAFE_componentWillMount() {
    this.props.toggleRefundMode();
  }

  componentWillUnmount() {
    this.props.toggleRefundMode();
  }

  render() {
    const { classes, inRefundMode, goHome } = this.props;
    return (
      <Background>
        <Prompt />
        <View className={classes.wrapper}>
          <StepsWizard
            dark={true}
            range={4}
            stage={1}
            alertOnExit={inRefundMode}
            onExit={() => {
              goHome();
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
                action={true}
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
  goHome: PropTypes.func.isRequired,
  inRefundMode: PropTypes.bool,
  toggleRefundMode: PropTypes.func,
};

export default injectSheet(styles)(Refund);
