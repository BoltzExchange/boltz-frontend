import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import QrCode from '../qrcode';

const styles = theme => ({
  wrapper: {
    height: '300x',
    width: '700px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  NodeInfo: {
    flexDirection: 'column',
  },
  uri: {
    overflowWrap: 'anywhere',
    wordBreak: 'break-all',
    fontSize: '18px',
    color: theme.colors.tundoraGrey,
  },
  name: {
    fontSize: '25px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: theme.colors.black,
  },
});

const NodeInfo = ({ classes, size, name, uri }) => {
  return (
    <View className={classes.wrapper}>
      <View className={classes.NodeInfo}>
        <span className={classes.name}>{name}:</span>
        <code className={classes.uri}>{uri}</code>
      </View>
      <QrCode className={classes.qr} size={size} link={uri} />
    </View>
  );
};

NodeInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default injectSheet(styles)(NodeInfo);
