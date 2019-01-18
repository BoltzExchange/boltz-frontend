import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../../../components/view';
import InputArea from '../../../components/inputarea';
import { getCurrencyName } from '../../../scripts/utils';

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

StyledInputAddress.propTypes = {
  classes: PropTypes.object.isRequired,
  swapInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

const InputAddress = injectSheet(inputAddressStyles)(StyledInputAddress);

export default InputAddress;
