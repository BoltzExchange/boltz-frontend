import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import QrCode from '../qrcode';

const styles = () => ({
  wrapper: {
    height: 'auto',
    width: '400px',
  },
  NodeInfo: {
    flexDirection: 'column',
  },
});

const NodeInfo = ({ classes, size, name, uri }) => (
  <View className={classes.wrapper}>
    <View className={classes.NodeInfo}>
      <h3 className={classes.name}>{name}:</h3>
      <code className={classes.uri}>{uri}</code>
    </View>
    <QrCode className={classes.qr} size={size} link={uri} />
  </View>
);

NodeInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default injectSheet(styles)(NodeInfo);
