import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import View from '../../components/view';
import { FaCheckCircle } from 'react-icons/fa';

const stepOneStyles = theme => ({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  dropZone: {
    height: '300px',
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
  uploadButton: {
    width: '260px',
    height: '50px',
    border: 'none',
    outline: 'none',
    backgroundColor: theme.colors.lightGrey,
    color: theme.colors.tundoraGrey,
    fontSize: '30px',
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const StyledStepOne = ({ classes }) => (
  <View className={classes.wrapper}>
    <View className={classes.dropZone}>
      <p className={classes.info}>Drag the Refund JSON file here</p>
      {/*TODO: add ability to upload*/}
      <span className={classes.uploadButton}>Select file</span>
    </View>
  </View>
);

StyledStepOne.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const StepOne = injectSheet(stepOneStyles)(StyledStepOne);

const stepTwoStyles = () => ({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    height: '200px',
    width: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: '30px',
  },
  link: {
    fontSize: '18px',
  },
  description: {
    fontSize: '30px',
  },
});
const StyledStepTwo = ({ classes }) => (
  <View className={classes.wrapper}>
    <View classes={classes.info}>
      <span className={classes.title}>Your refund transaction is:</span>
      <a
        className={classes.link}
        href={
          'https://www.blockchain.com/btc/address/1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX'
        }
      >
        1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX
      </a>
      <p className={classes.description}>
        Please wait for Block <b>549843</b> to be mained <br />
        and broadcast the transaction to claim <br />
        refund.
      </p>
    </View>
  </View>
);

StyledStepTwo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const StepTwo = injectSheet(stepTwoStyles)(StyledStepTwo);

const stepFourStyles = () => ({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    margin: '15px',
    fontSize: '30px',
  },
});

const StyledStepFour = ({ classes }) => (
  <View className={classes.wrapper}>
    <FaCheckCircle size={240} color="lightgreen" />
    <span className={classes.title}>Success!</span>
  </View>
);

StyledStepFour.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const StepFour = injectSheet(stepFourStyles)(StyledStepFour);
