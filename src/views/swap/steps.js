import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import QrCode from '../../components/qrcode';
import { FaBolt } from 'react-icons/fa';
import View from '../../components/view';
import InputArea from '../../components/inputarea';
import { getCurrencyName, toWholeCoins } from '../../scripts/utils';

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
    const { classes, swapInfo } = this.props;
    const { error } = this.state;

    return (
      <View className={classes.wrapper}>
        <p className={classes.title}>
          Paste a <b>{getCurrencyName(swapInfo.quote)}</b> Lightning {}
          <FaBolt size={30} color="#FFFF00" /> invoice for <br />
          <b>
            {swapInfo.quoteAmount} {swapInfo.quote}
          </b>
        </p>
        <InputArea
          autoFocus={true}
          width={600}
          height={150}
          onChange={this.onChange}
          error={error}
          placeholder={
            'Paste you invoice here: lntb20n1pwqhmchpp5v9tsdn62ptl47z8wvzj7xakw09wmj5yax05pv5z2alhpqgdmedlsd' +
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
  swapInfo: PropTypes.object.isRequired,
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
  text: {
    fontSize: '30px',
  },
  address: {
    width: '300px',
    fontSize: '25px',
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

const StyledStepTwo = ({ classes, swapInfo, swapResponse }) => (
  <View className={classes.wrapper}>
    <View className={classes.qrcode}>
      <QrCode size={300} link={swapResponse.bip21} />
    </View>
    <View className={classes.info}>
      <p className={classes.text}>
        Send{' '}
        <b>
          {' '}
          {toWholeCoins(swapResponse.expectedAmount)} {swapInfo.base}{' '}
        </b>{' '}
        <br />
        on <b>{getCurrencyName(swapInfo.base)}</b> <br />
        blockchain address:
      </p>
      <p id="copy-address" className={classes.address}>
        {swapResponse.address}
      </p>
      <span className={classes.action} onClick={() => copyToClipBoard()}>
        Copy
      </span>
    </View>
  </View>
);

StyledStepTwo.propTypes = {
  classes: PropTypes.object.isRequired,
  swapInfo: PropTypes.object.isRequired,
  swapResponse: PropTypes.object.swapResponse,
};

export const StepTwo = injectSheet(stepTwoStyles)(StyledStepTwo);

const stepThreeStyles = () => ({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  info: {
    fontSize: '30px',
    alignSelf: 'flex-start',
  },
  address: {
    fontSize: '30px',
    alignSelf: 'flex-start',
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
    const {
      classes,
      currency,
      redeemScript,
      privateKey,
      timeoutBlockHeight,
    } = this.props;
    return (
      <View className={classes.wrapper}>
        <View className={classes.placer}>
          <p className={classes.info}>
            <a
              ref={this.ref}
              href={`data:application/json;charset=utf-8,${JSON.stringify({
                currency,
                redeemScript,
                privateKey,
                timeoutBlockHeight,
              })}`}
              download={'refund.json'}
            >
              Click here
            </a>{' '}
            if the download of &lsquo;refund.json&lsquo; <br /> didn&apos;t
            start automatically.
          </p>
          <p className={classes.address}>
            This refund file can be used to trsutlessly <br />
            claim your coins back in case of failure of this <br />
            swap. It is recommended to not delete this <br />
            file until after the completion of this swap.
          </p>
        </View>
      </View>
    );
  }
}

StyledStepThree.propTypes = {
  classes: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  redeemScript: PropTypes.string.isRequired,
  privateKey: PropTypes.string.isRequired,
  timeoutBlockHeight: PropTypes.number.isRequired,
};

export const StepThree = injectSheet(stepThreeStyles)(StyledStepThree);

const stepFourStyles = () => ({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: '30px',
  },
});

const StyledStepFour = ({ classes }) => (
  <View className={classes.wrapper}>
    <span className={classes.text}>Viola! Swap is successful!</span>
  </View>
);

StyledStepFour.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const StepFour = injectSheet(stepFourStyles)(StyledStepFour);
