import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import QrCode from '../qrcode';

const styles = () => ({
  node: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '120px',
  },
  name: {
    marginBottom: '0px',
  },
  uri: {
    flexWrap: 'wrap',
    fontSize: '15px',
    wordBreak: 'break-all',
  },
  qr: {
    flexWrap: 'wrap',
  },
});

const NodeInfo = ({ classes, size, name, uri }) => (
  <View className={classes.node}>
    <h3 className={classes.name}>{name}:</h3>
    <QrCode className={classes.qr} size={size} link={uri} />
    <code className={classes.uri}>{uri}</code>
  </View>
);

NodeInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default injectSheet(styles)(NodeInfo);
