import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import QrCode from '../../components/qrcode';
import { FaCheckCircle, FaBolt } from 'react-icons/fa';
import View from '../../components/view';
import InputArea from '../../components/inputarea';

// TODO: refactor into multiple components.
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

class StyledStepOne extends React.Component {
  state = {
    error: false,
  };

  onChange = input => {
    const valid = input.slice(0, 2);
    if (valid === 'ln') {
      this.props.onChange(input);
      if (this.state.error) {
        this.setState({ error: false });
      }
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { classes, value } = this.props;
    const { error } = this.state;
    return (
      <View className={classes.wrapper}>
        <p className={classes.title}>
          Paste a <b>Bitcoin</b> lightning <FaBolt size={30} color="#FFFF00" />{' '}
          invoice of <br />
          <b>
            {value.sent} {value.sentCurrency}
          </b>{' '}
          to receive it.
        </p>
        <InputArea
          width={600}
          height={150}
          onChange={this.onChange}
          error={error}
          placeholder={
            'lntb20n1pwqhmchpp5v9tsdn62ptl47z8wvzj7xakw09wmj5yax05pv5z2alhpqgdmedlsd' +
            'qqcqzys2wuh6vnuu8f6c94mx7wlduh8kge8ftuarg23nnkpuhgdjpw96hdj2qem2mcztny8vxng6gdc5xsfh2' +
            'z6rf2rt42hc3k5udm2jcynjyspr262hk'
          }
        />
      </View>
    );
  }
}

StyledStepOne.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
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
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const copyToClipBoard = () => {
  const range = document.getSelection().getRangeAt(0);
  range.selectNode(document.getElementById('copy-address'));
  window.getSelection().addRange(range);
  document.execCommand('copy');
};

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
        Send{' '}
        <b>
          {value.received} {value.receivedCurrency}
        </b>{' '}
        <br />
        on <b>Litecoin</b> <br />
        blockchain address:
      </p>
      <p className={classes.address} id="copy-address">
        {address}
      </p>
      {/* TODO: refactor how we copy */}
      <span className={classes.action} onClick={() => copyToClipBoard()}>
        Copy
      </span>
    </View>
  </View>
);

StyledStepTwo.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
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
    const { classes, redeemScript, address, currency, privateKey } = this.props;
    return (
      <View className={classes.wrapper}>
        <p className={classes.info}>
          <a
            ref={this.ref}
            href={`data:application/json;charset=utf-8,${JSON.stringify({
              redeemScript,
              privateKey,
              currency,
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
            href={`https://blockstream.info/address/${address}`}
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
  redeemScript: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
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
