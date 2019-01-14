import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../../components/view';
import QrCode from '../../components/qrcode';
import InputArea from '../../components/inputarea';
import { getCurrencyName, copyToClipBoard } from '../../scripts/utils';

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
});

class StyledStepOne extends React.Component {
  state = {
    error: false,
  };

  onChange = input => {
    if (input !== '') {
      this.props.onChange(input);
      this.setState({ error: false });
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
          Paste a <b>{getCurrencyName(swapInfo.quote)}</b> address
        </p>
        <InputArea
          width={600}
          height={150}
          onChange={this.onChange}
          error={error}
          placeholder={'EG: bc1qvclmsfvjsjpz3mavtpnjk5xrpc7gupe03nz8pa'}
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
  info: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
  },
  invoice: {
    fontSize: '20px',
    color: 'grey',
    wordBreak: 'break-word',
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  title: {
    fontSize: '30px',
    textAlign: 'center',
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

const StyledStepTwo = ({ classes, asset, invoice }) => (
  <View className={classes.wrapper}>
    <View className={classes.qrcode}>
      <QrCode size={300} link={invoice} />
    </View>
    <View className={classes.info}>
      <p className={classes.title}>Pay this {asset} Lightning invoice</p>
      <p className={classes.invoice} id="copy">
        {invoice}
      </p>
      <span className={classes.action} onClick={() => copyToClipBoard()}>
        Copy
      </span>
    </View>
  </View>
);

StyledStepTwo.propTypes = {
  classes: PropTypes.object.isRequired,
  asset: PropTypes.string.isRequired,
  invoice: PropTypes.string.isRequired,
};

export const StepTwo = injectSheet(stepTwoStyles)(StyledStepTwo);
