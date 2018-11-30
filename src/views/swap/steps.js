import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import qr from '../../asset/icons/qr_code.png';
import { FaCheckCircle, FaBolt } from 'react-icons/fa';
import View from '../../components/view';

//TODO: refactor into multipe components.
const stepOneStyles = () => ({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '30px',
  },
  invoice: {
    padding: '50px',
    wordBreak: 'break-all',
    whiteSpace: 'normal',
    width: '600px',
    height: '100px',
    color: '#505050',
    fontSize: '18px',
    backgroundColor: '#D3D3D3',
    borderRadius: '3px',
  },
});

const StyledStepOne = ({ classes, value }) => (
  <View className={classes.wrapper}>
    <p className={classes.title}>
      Paste a <b>Bitcoin</b> lightning <FaBolt size={30} color="#FFFF00" />{' '}
      invoice of <br />
      <b>{value} T-BTC</b> to receive it.
    </p>
    <p className={classes.invoice}>
      lnbc1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdpl2pkx2ctnv5
      sxxmmwwd5kgetjypeh2ursdae8g6twvus8g6rfwvs8qun0dfjkxaq8rkx3yf5tcsyz3d73gafnh3cax
      9rn449d9p5uxz9ezhhypd0elx87sjle52x86fux2ypatgddc6k63n7erqz25le42c4u4ecky03ylcqca784w
    </p>
  </View>
);

StyledStepOne.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
};

export const StepOne = injectSheet(stepOneStyles)(StyledStepOne);

const stepTwoStyles = () => ({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrcode: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '300px',
    height: '300px',
  },
  info: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
  },
  address: {
    fontSize: '28px',
    color: 'grey',
  },
  action: {
    color: 'blue',
    fontWeight: '600',
    fontSize: '30px',
    marginLeft: '50%',
  },
});

const StyledStepTwo = ({ classes, value }) => (
  <View className={classes.wrapper}>
    <View className={classes.qrcode}>
      <img src={qr} className={classes.image} alt={'qr code'} />
    </View>
    <View className={classes.info}>
      <p
        style={{
          fontSize: '30px',
        }}
      >
        Send <b>{value} T-BTC</b> <br />
        on <b>Bitcoin</b> <br />
        blockchain address:
      </p>
      <p className={classes.address}>
        1F1tAaz5x1HUXrCNLbt
        <br />
        MDqcw6o5GNn4xqX
      </p>
      <span className={classes.action}>Copy</span>
    </View>
  </View>
);

StyledStepTwo.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
};

export const StepTwo = injectSheet(stepTwoStyles)(StyledStepTwo);

const stepThreeStyles = () => ({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  info: {
    fontSize: '30px',
  },
  address: {
    fontSize: '30px',
  },
  link: {
    fontSize: '24px',
  },
});

const StyledStepThree = ({ classes }) => (
  <View className={classes.wrapper}>
    <p className={classes.info}>
      <a href={'#0'}>Click here</a> if download of &lsquo;Refund JSON&lsquo;
      didn&apos;t <br /> start automatically.
    </p>
    <p className={classes.address}>
      Waiting for one confirmation on Blockchain
      <br /> address:
      <br />
      <a
        className={classes.link}
        href={
          'https://www.blockchain.com/btc/address/1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX'
        }
      >
        1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX
      </a>
    </p>
  </View>
);

StyledStepThree.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const StepThree = injectSheet(stepThreeStyles)(StyledStepThree);

const stepFourStyles = () => ({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  info: {
    margin: '15px',
    fontSize: '30px',
  },
});

const StyledStepFour = ({ classes }) => (
  <View className={classes.wrapper}>
    <FaCheckCircle size={240} color="#50E3C2" />
    <span className={classes.info}>Success!</span>
  </View>
);

StyledStepFour.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const StepFour = injectSheet(stepFourStyles)(StyledStepFour);
/*
const errorStyles = theme => ({
  wrapper: {
    width: '700px',
    height: '400px',
    boxShadow: '0px 0px 30px -6px rgba(0,0,0,0.52)',
    backgroundColor: theme.colors.white,
    flexDirection: 'column',
  },
  content: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: '20%',
    backgroundColor: theme.colors.matisseBlue,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  info: {
    fontSize: '30px',
  },
  link: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.colors.white,
  },
});

const StyledError = ({ classes }) => (
  <View className={classes.wrapper}>
    <View className={classes.content}>
      <p className={classes.info}> You cannot begin a swap.</p>
    </View>
    <View className={classes.button}>
      <Link className={classes.link} to={'/'} replace>
        <h1>Back</h1>
      </Link>
    </View>
  </View>
);

StyledError.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
};

export const Error = injectSheet(errorStyles)(StyledError);
*/
