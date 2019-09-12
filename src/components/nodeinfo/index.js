import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import QrCode from '../qrcode';

const styles = theme => ({
  wrapper: {
    padding: '20px',
    paddingLeft: '0',
  },
  uriWrapper: {
    flex: '1 0 content',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 425px)': {
      justifyContent: 'center',
      width: '100%',
    },
  },
  NodeInfo: {
    flexDirection: 'column',
  },
  uri: {
    overflowWrap: 'anywhere',
    wordBreak: 'break-all',
    paddingLeft: '20px',
    paddingRight: '20px',
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

const NodeInfo = ({ classes, size, name, uri, onionUri }) => {
  return (
    <div className={classes.wrapper}>
      <h3 className={classes.name}>{name}:</h3>
      <View className={classes.uriWrapper}>
        <View className={classes.NodeInfo}>
          <code className={classes.uri}>{uri}</code>
        </View>
        <QrCode className={classes.qr} size={size} link={uri} />
      </View>

      {onionUri === undefined || onionUri === '' ? (
        undefined
      ) : (
        <div>
          <p>Onion address:</p>

          <View className={classes.uriWrapper}>
            <View className={classes.NodeInfo}>
              <code className={classes.uri}>{onionUri}</code>
            </View>
          </View>
        </div>
      )}
    </div>
  );
};

NodeInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  onionUri: PropTypes.string,
};

export default injectSheet(styles)(NodeInfo);
