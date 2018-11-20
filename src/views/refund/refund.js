import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import Background from '../../components/background';
import TaskBar from '../../components/taskbar';
import StepsWizard from '../../components/stepswizard';
import View from '../../components/view';

const styles = () => ({
  wrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

const StepOne = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <p style={{ fontSize: '36px', color: '#505050' }}>
      Choose the refund JSON file <br /> or drag it here.
    </p>
  </View>
);

const StepTwo = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        height: '200px',
        width: 'auto',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <span
        style={{
          fontSize: '30px',
        }}
      >
        Your refund transaction is:
      </span>
      <a
        style={{
          fontSize: '18px',
        }}
        href={
          'https://www.blockchain.com/btc/address/1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX'
        }
      >
        1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX
      </a>
      <p style={{ fontSize: '30px' }}>
        Please wait for Block <b>549843</b> to be mained <br />
        and broadcast the transaction to claim <br />
        refund.
      </p>
    </View>
  </View>
);

const StepFour = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <FaCheckCircle size={240} color="lightgreen" />
    <span
      style={{
        margin: '15px',
        fontSize: '30px',
      }}
    >
      Success!
    </span>
  </View>
);

const Controls = ({ text }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h1 style={{ color: '#fff', fontWeight: '300' }}>{text}</h1>
    <FaArrowRight
      size={20}
      color={'#FFF'}
      style={{
        margin: '10px',
      }}
    />
  </View>
);

Controls.propTypes = {
  text: PropTypes.string,
};

const Refund = ({ classes }) => (
  <Background>
    <TaskBar />
    <View className={classes.wrapper}>
      <StepsWizard range={4} stage={1}>
        <StepsWizard.Steps>
          <StepsWizard.Step num={1} render={() => <StepOne />} />
          <StepsWizard.Step num={2} render={() => <StepTwo />} />
          <StepsWizard.Step num={3} render={() => <StepTwo />} />
          <StepsWizard.Step num={4} render={() => <StepFour />} />
        </StepsWizard.Steps>
        <StepsWizard.Controls>
          <StepsWizard.Control num={1} render={() => <Controls />} />
          <StepsWizard.Control
            num={2}
            render={() => <Controls text={'Waiting...'} />}
          />
          <StepsWizard.Control
            num={3}
            render={() => <Controls text={'Claim Refund'} />}
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

Refund.propTypes = {
  classes: PropTypes.object,
};

export default injectSheet(styles)(Refund);
