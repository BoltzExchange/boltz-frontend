import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import View from '../../components/view';
import { FaCheckCircle } from 'react-icons/fa';
import DropZone from '../../components/dropzone';
import FileUpload from '../../components/fileupload';
import InputArea from '../../components/inputarea';

const stepOneStyles = theme => ({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '1vh',
    backgroundColor: theme.colors.aeroBlue,
  },
  dropZone: {
    height: '300px',
    zIndex: 2000,
    width: '700px',
    flexDirection: 'column',
    border: `3px dotted ${theme.colors.lightGrey}`,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  info: {
    fontSize: '30px',
    color: theme.colors.tundoraGrey,
  },
});

const StyledStepOne = ({ classes, setRefundFile, setTransactionHash }) => (
  <View className={classes.wrapper}>
    <DropZone className={classes.dropZone} onFileRead={setRefundFile}>
      <p className={classes.info}>Drag the Refund JSON file here</p>
      <span className={classes.info}>or</span>
      <FileUpload text={'Select file'} onFileRead={setRefundFile} />
    </DropZone>

    <p className={classes.info}>Lockup transaction hash</p>
    <InputArea
      height={150}
      width={500}
      onChange={setTransactionHash}
      placeholder={
        '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098'
      }
    />
  </View>
);

StyledStepOne.propTypes = {
  classes: PropTypes.object.isRequired,
  setRefundFile: PropTypes.func.isRequired,
  setTransactionHash: PropTypes.func.isRequired,
};

export const StepOne = injectSheet(stepOneStyles)(StyledStepOne);

const stepTwoStyles = theme => ({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '1vh',
    backgroundColor: theme.colors.aeroBlue,
  },
  info: {
    fontSize: '30px',
    color: theme.colors.tundoraGrey,
  },
});

const StyledStepTwo = ({ classes, setDestinationAddress }) => (
  <View className={classes.wrapper}>
    <p className={classes.info}>Litecoin Destintion Address</p>
    <InputArea
      height={150}
      width={500}
      onChange={setDestinationAddress}
      placeholder={'tb1qjnxa3c36s524qv4uqsclcjefuxrgzktcrky4zd'}
    />
  </View>
);

StyledStepTwo.propTypes = {
  classes: PropTypes.object.isRequired,
  setDestinationAddress: PropTypes.func.isRequired,
};

export const StepTwo = injectSheet(stepTwoStyles)(StyledStepTwo);

const stepThreeStyles = theme => ({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.colors.aeroBlue,
  },
  icon: {
    color: theme.colors.turquoise,
  },
  title: {
    margin: '15px',
    fontSize: '30px',
  },
  transaction: {
    wordBreak: 'break-all',
    paddingLeft: '1vw',
    paddingRight: '1vw',
  },
});

const StyledStepThree = ({
  classes,
  refundTransaction,
  refundTransactionHash,
}) => (
  <View className={classes.wrapper}>
    <FaCheckCircle size={240} className={classes.icon} />
    <span className={classes.title}>Success!</span>
    <p>Your refund transaction:</p>
    <code className={classes.transaction}>{refundTransaction}</code>

    <p>
      <a
        className={classes.link}
        target={'_blank'}
        href={`https://chain.so/tx/LTCTEST/${refundTransactionHash}`}
      >
        {refundTransactionHash}
      </a>
    </p>
  </View>
);

StyledStepThree.propTypes = {
  classes: PropTypes.object.isRequired,
  refundTransaction: PropTypes.string.isRequired,
  refundTransactionHash: PropTypes.string.isRequired,
};

export const StepThree = injectSheet(stepThreeStyles)(StyledStepThree);
