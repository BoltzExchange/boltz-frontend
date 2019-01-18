import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Controls from '../../components/controls';
import Background from '../../components/background';
import StepsWizard from '../../components/stepswizard';
import Prompt from '../../components/prompt';
import View from '../../components/view';
import {
  InputDestinationAddress,
  UploadRefundFile,
  CompleteRefund,
} from './steps';

const styles = theme => ({
  wrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileUpload: {
    color: theme.colors.white,
    fontWeight: '300',
  },
});

const Refund = ({
  classes,
  goHome,
  refundFile,
  setRefundFile,
  transactionHash,
  setTransactionHash,
  destinationAddress,
  setDestinationAddress,
  startRefund,
  completeRefund,
  refundTransaction,
  refundTransactionHash,
  isFetching,
}) => {
  return (
    <Background>
      <Prompt />
      <View className={classes.wrapper}>
        <StepsWizard
          dark={true}
          range={3}
          stage={1}
          onExit={() => {
            if (window.confirm('Are you sure you want to exit')) {
              completeRefund();
              goHome();
            }
          }}
          message={'Are you sure?'}
        >
          <StepsWizard.Steps>
            <StepsWizard.Step
              num={1}
              render={() => (
                <UploadRefundFile
                  setRefundFile={setRefundFile}
                  setTransactionHash={setTransactionHash}
                />
              )}
            />
            <StepsWizard.Step
              num={2}
              render={() => (
                <InputDestinationAddress
                  currency={refundFile.currency}
                  setDestinationAddress={setDestinationAddress}
                />
              )}
            />
            <StepsWizard.Step
              num={3}
              render={() => (
                <CompleteRefund
                  refundTransaction={refundTransaction}
                  refundTransactionHash={refundTransactionHash}
                />
              )}
            />
          </StepsWizard.Steps>
          <StepsWizard.Controls>
            <StepsWizard.Control
              num={1}
              action={true}
              render={props => (
                <Controls
                  text={'Next'}
                  onPress={() => props.nextStage()}
                  loadingText={'Upload refund file'}
                  loadingStyle={classes.fileUpload}
                  loading={Object.keys(refundFile).length === 0}
                />
              )}
            />
            <StepsWizard.Control
              num={2}
              render={props => (
                <Controls
                  loading={isFetching}
                  text={'Generate refund transaction'}
                  onPress={() =>
                    startRefund(
                      refundFile,
                      transactionHash,
                      destinationAddress,
                      props.nextStage
                    )
                  }
                />
              )}
            />
            <StepsWizard.Control
              num={3}
              render={() => (
                <Controls
                  text={'Successfully completed refund!'}
                  onPress={() => {
                    completeRefund();
                    goHome();
                  }}
                />
              )}
            />
          </StepsWizard.Controls>
        </StepsWizard>
      </View>
    </Background>
  );
};

Refund.propTypes = {
  classes: PropTypes.object,
  goHome: PropTypes.func.isRequired,
  nextStage: PropTypes.func,
  isFetching: PropTypes.bool,
  refundFile: PropTypes.object,
  setRefundFile: PropTypes.func.isRequired,
  transactionHash: PropTypes.string,
  setTransactionHash: PropTypes.func.isRequired,
  destinationAddress: PropTypes.string,
  setDestinationAddress: PropTypes.func.isRequired,
  startRefund: PropTypes.func.isRequired,
  completeRefund: PropTypes.func.isRequired,
  refundTransaction: PropTypes.string,
  refundTransactionHash: PropTypes.string,
};

export default injectSheet(styles)(Refund);
