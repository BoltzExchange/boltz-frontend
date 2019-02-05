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

const uploadRefundFileText = (refundFile, txHash) => {
  if (Object.keys(refundFile).length === 0) {
    return 'Upload refund file';
  } else if (txHash === '') {
    return 'Input transaction hash';
  } else {
    return 'Upload refund file';
  }
};

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
                  isUploaded={Object.keys(refundFile).length !== 0}
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
                <CompleteRefund refundTransactionHash={refundTransactionHash} />
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
                  loadingText={uploadRefundFileText(
                    refundFile,
                    transactionHash
                  )}
                  loadingStyle={classes.fileUpload}
                  loading={
                    Object.keys(refundFile).length === 0 ||
                    transactionHash === ''
                  }
                />
              )}
            />
            <StepsWizard.Control
              num={2}
              render={props => (
                <Controls
                  loading={isFetching || !destinationAddress}
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
                  text={'Try another Swap!'}
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
  refundTransactionHash: PropTypes.string,
};

export default injectSheet(styles)(Refund);
