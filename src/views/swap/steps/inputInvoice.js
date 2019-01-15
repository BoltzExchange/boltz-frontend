import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { FaBolt } from 'react-icons/fa';
import View from '../../../components/view';
import InputArea from '../../../components/inputarea';
import { getCurrencyName } from '../../../scripts/utils';

const InputInvoiceStyles = () => ({
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

class StyledInputInvoice extends React.Component {
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
            'Paste your invoice here: lntb20n1pwqhmchpp5v9tsdn62ptl47z8wvzj7xakw09wmj5yax05pv5z2alhpqgdmedlsd' +
            'qqcqzys2wuh6vnuu8f6c94mx7wlduh8kge8ftuarg23nnkpuhgdjpw96hdj2qem2mcztny8vxng6gdc5xsfh2' +
            'z6rf2rt42hc3k5udm2jcynjyspr262hk'
          }
        />
      </View>
    );
  }
}

StyledInputInvoice.propTypes = {
  classes: PropTypes.object.isRequired,
  swapInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

const InputInvoice = injectSheet(InputInvoiceStyles)(StyledInputInvoice);

export default InputInvoice;
