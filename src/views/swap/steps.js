import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import QrCode from '../../components/qrcode';
import { FaCheckCircle, FaBolt } from 'react-icons/fa';
import View from '../../components/view';
import InputArea from '../../components/inputarea';

// TODO: refactor into multipe components.
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

const StyledStepOne = ({ classes, value, onChange }) => (
  <View className={classes.wrapper}>
    <p className={classes.title}>
      Paste a <b>Bitcoin</b> lightning <FaBolt size={30} color="#FFFF00" />{' '}
      invoice of <br />
      <b>{value} T-BTC</b> to receive it.
    </p>
    <InputArea width={600} height={150} onChange={onChange} />
  </View>
);

StyledStepOne.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
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
    wordBreak: 'break-word',
  },
  action: {
    color: 'blue',
    fontWeight: '600',
    fontSize: '30px',
    marginLeft: '50%',
  },
});

const StyledStepTwo = ({ classes, value, address, link }) => (
  <View className={classes.wrapper}>
    <View className={classes.qrcode}>
      <QrCode size={300} link={link} />
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
      <p className={classes.address}>{address}</p>
      <span className={classes.action}>Copy</span>
    </View>
  </View>
);

StyledStepTwo.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
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

class StyledStepThree extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.ref.current.click();
  }

  render() {
    const { classes, content, address, privateKey } = this.props;
    return (
      <View className={classes.wrapper}>
        <p className={classes.info}>
          <a
            ref={this.ref}
            href={`data:application/json;charset=utf-8,${JSON.stringify({
              ...content,
              ...{ privateKey },
            })}`}
            download={'refund.json'}
          >
            Click here
          </a>{' '}
          if download of &lsquo;Refund JSON&lsquo; didn&apos;t <br /> start
          automatically.
        </p>
        <p className={classes.address}>
          Waiting for one confirmation on Blockchain
          <br /> address:
          <br />
          <a
            className={classes.link}
            target={'_blank'}
            href={`https://www.blockchain.com/btc/address/${address}`}
          >
            {address}
          </a>
        </p>
      </View>
    );
  }
}

StyledStepThree.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  privateKey: PropTypes.string.isRequired,
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
