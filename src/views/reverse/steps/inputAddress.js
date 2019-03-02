import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { address } from 'bitcoinjs-lib';
import View from '../../../components/view';
import InputArea from '../../../components/inputarea';
import {
  getCurrencyName,
  getSampleAddress,
  getNetwork,
} from '../../../scripts/utils';

const inputAddressStyles = () => ({
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

class StyledInputAddress extends React.Component {
  state = {
    error: false,
  };

  showError = () => {
    this.props.onChange(undefined);
    this.setState({ error: true });
  };

  onChange = input => {
    const { onChange, swapInfo } = this.props;

    if (input !== '') {
      try {
        const swapAddress = input.trim();

        address.toOutputScript(swapAddress, getNetwork(swapInfo.quote));

        onChange(swapAddress);
        this.setState({ error: false });
      } catch (error) {
        this.showError();
      }
    } else {
      this.showError();
    }
  };

  render() {
    const { error } = this.state;
    const { classes, swapInfo } = this.props;

    return (
      <View className={classes.wrapper}>
        <p className={classes.title}>
          Paste a <b>{getCurrencyName(swapInfo.quote)}</b> address to which you
          want to receive
        </p>
        <InputArea
          width={600}
          autoFocus={true}
          height={150}
          error={error}
          onChange={this.onChange}
          placeholder={`EG: ${getSampleAddress(swapInfo.quote)}`}
        />
      </View>
    );
  }
}

StyledInputAddress.propTypes = {
  classes: PropTypes.object.isRequired,
  swapInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

const InputAddress = injectSheet(inputAddressStyles)(StyledInputAddress);

export default InputAddress;
