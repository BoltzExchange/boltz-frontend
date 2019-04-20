import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { FaBolt } from 'react-icons/fa';
import View from '../../../components/view';
import InputArea from '../../../components/inputarea';
import {
  toSatoshi,
  getCurrencyName,
  getSampleInvoice,
  getSmallestDenomination,
} from '../../../utils';

const InputInvoiceStyles = () => ({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '30px',
    '@media (max-width: 425px)': {
      fontSize: '16px',
    },
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

class StyledInputInvoice extends React.Component {
  state = {
    error: false,
  };

  componentDidMount() {
    const { swapInfo, webln } = this.props;

    if (webln) {
      webln.makeInvoice(toSatoshi(swapInfo.quoteAmount)).then(response => {
        const invoice = response.paymentRequest;

        this.setState({ value: invoice });
        this.onChange(invoice);
      });
    }
  }

  onChange = input => {
    if (input.slice(0, 2) === 'ln' || input.slice(0, 10) === 'lightning:') {
      this.setState({ value: input, error: false }, () =>
        this.props.onChange(input, false)
      );
    } else {
      this.setState({ value: input, error: true }, () =>
        this.props.onChange(input, true)
      );
    }
  };

  render() {
    const { error } = this.state;
    const { classes, swapInfo } = this.props;

    return (
      <View className={classes.wrapper}>
        <p className={classes.title}>
          Paste a <b>{getCurrencyName(swapInfo.quote)}</b> Lightning {}
          <FaBolt size={25} color="#FFFF00" /> invoice for <br />
          <b>
            {toSatoshi(swapInfo.quoteAmount)}{' '}
            {getSmallestDenomination(swapInfo.quote)}
          </b>
        </p>
        <InputArea
          width={600}
          height={150}
          error={error}
          autoFocus={true}
          value={this.state.value}
          onChange={this.onChange}
          placeholder={`EG: ${getSampleInvoice(swapInfo.quote)}`}
        />
      </View>
    );
  }
}

StyledInputInvoice.propTypes = {
  classes: PropTypes.object.isRequired,
  swapInfo: PropTypes.object.isRequired,
  webln: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

const InputInvoice = injectSheet(InputInvoiceStyles)(StyledInputInvoice);

export default InputInvoice;
