import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import View from '../../../components/view';
import InputArea from '../../../components/inputarea';
import { getCurrencyName, getSampleAddress } from '../../../utils';

const InputDestinationAddressStyles = theme => ({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '1vh',
    backgroundColor: theme.colors.aeroBlue,
  },
  info: {
    fontSize: '30px',
    color: theme.colors.tundoraGrey,
    '@media (max-width: 425px)': {
      fontSize: '18px',
    },
  },
});

const StyledInputDestinationAddress = ({
  classes,
  setDestinationAddress,
  currency,
}) => (
  <View className={classes.wrapper}>
    <p className={classes.info}>
      {getCurrencyName(currency)} Destination Address
    </p>
    <InputArea
      height={150}
      width={500}
      showQrScanner={true}
      onChange={setDestinationAddress}
      placeholder={`EG: ${getSampleAddress(currency)}`}
    />
  </View>
);

StyledInputDestinationAddress.propTypes = {
  classes: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  setDestinationAddress: PropTypes.func.isRequired,
};

const InputDestinationAddress = injectSheet(InputDestinationAddressStyles)(
  StyledInputDestinationAddress
);

export default InputDestinationAddress;
