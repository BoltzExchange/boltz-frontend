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
  },
  name: {
    marginBottom: '0px',
  },
  uri: {
    width: '90%',
    flexWrap: 'wrap',
    paddingTop: '80px',
    wordBreak: 'break-all',
  },
  qr: {
    flexWrap: 'wrap',
  },
});

class NodeInfo extends React.Component {
  render() {
    const { classes, name, uri } = this.props;

    return (
      <View className={classes.node}>
        <h3 className={classes.name}>{name}:</h3>

        <View>
          <code className={classes.uri}>{uri}</code>
          <QrCode className={classes.qr} size={200} link={uri} />
        </View>
      </View>
    );
  }
}

NodeInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
};

export default injectSheet(styles)(NodeInfo);
