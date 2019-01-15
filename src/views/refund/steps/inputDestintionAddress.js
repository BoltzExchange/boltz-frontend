import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { getCurrencyName } from '../../../scripts/utils';
import View from '../../../components/view';
import InputArea from '../../../components/inputarea';

const InputDestintionAddressStyles = theme => ({
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
  },
});

const StyledInputDestintionAddress = ({
  classes,
  setDestinationAddress,
  currency,
}) => (
  <View className={classes.wrapper}>
    <p className={classes.info}>
      {getCurrencyName(currency)} Destintion Address
    </p>
    <InputArea
      height={150}
      width={500}
      onChange={setDestinationAddress}
      placeholder={'tb1qjnxa3c36s524qv4uqsclcjefuxrgzktcrky4zd'}
    />
  </View>
);

StyledInputDestintionAddress.propTypes = {
  classes: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  setDestinationAddress: PropTypes.func.isRequired,
};

const InputDestintionAddress = injectSheet(InputDestintionAddressStyles)(
  StyledInputDestintionAddress
);

export default InputDestintionAddress;
