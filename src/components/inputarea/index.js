import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import QrReader from 'react-qr-reader';
import ReactNotification from 'react-notifications-component';
import { notificationData } from '../../utils';

const cameraIcon = require('../../asset/icons/camera_icon.svg');

const styles = theme => ({
  formGroup: {
    position: 'relative',
  },
  textBox: {
    border: 'none',
    resize: 'none',
    fontSize: '18px',
    borderRadius: '3px',
    padding: '6px 12px',
    wordBreak: 'break-all',
    width: p => `${p.width}px`,
    height: p => `${p.height}px`,
    outline: p => (p.error ? '1px solid red' : 'none'),
    backgroundColor: theme.colors.lightGrey,
    '@media (max-width: 425px)': {
      width: () => `${300}px`,
    },
  },
  cameraIcon: {
    width: '32px',
    height: '32px',
    position: 'absolute',
    right: '5px',
    bottom: '6px',
    cursor: 'pointer',
  },
  qrScannerWrapper: {
    position: 'fixed',
    height: '300px',
    width: '300px',
    top: '50%',
    left: '50%',
    marginTop: '-150px',
    marginLeft: '-150px',
    zIndex: '99999999999999999999',
  },
});

class InputArea extends React.Component {
  constructor(props) {
    super(props);

    this.notificationDom = React.createRef();

    this.state = {
      value: '',
      openScanner: false,
    };
  }

  clickListener = () => {
    this.setState({
      openScanner: false,
    });

    document.removeEventListener('click', this.clickListener);
  };

  openScanner = () => {
    document.addEventListener('click', this.clickListener);

    this.setState({
      openScanner: true,
    });
  };

  handleScan = data => {
    if (data !== null) {
      console.log(`Scanned QR code: ${data}`);

      if (data.includes(':')) {
        data = data.split(':')[1];
      }

      this.props.onChange(data);

      this.setState({
        value: data,
        openScanner: false,
      });
    }
  };

  handleScanError = error => {
    this.setState({
      openScanner: false,
    });

    const errorMessage = {
      title: 'Could not scan QR code',
      message: error.toString(),
    };

    console.log(`${errorMessage.title}: ${errorMessage.message}`);

    this.notificationDom.current.addNotification(
      notificationData(errorMessage, 1)
    );
  };

  render() {
    const {
      classes,
      autoFocus,
      height,
      width,
      onChange,
      placeholder,
      showQrScanner,
    } = this.props;

    return (
      <div className={classes.formGroup}>
        <ReactNotification ref={this.notificationDom} />
        <textarea
          autoFocus={autoFocus}
          value={this.state.value}
          placeholder={placeholder}
          className={classes.textBox}
          rows={height}
          cols={width}
          onChange={event => {
            const newValue = event.target.value;

            this.setState({
              value: newValue,
            });
            onChange(newValue);
          }}
        />
        {this.state.openScanner ? (
          <div className={classes.qrScannerWrapper}>
            <QrReader
              delay={500}
              onScan={this.handleScan}
              onError={this.handleScanError}
              className={classes.qrScanner}
              style={{ width: '100%' }}
            />
          </div>
        ) : (
          undefined
        )}
        {showQrScanner ? (
          <img
            className={classes.cameraIcon}
            src={cameraIcon}
            alt={'Scan QR code'}
            onClick={this.openScanner}
          />
        ) : (
          undefined
        )}
      </div>
    );
  }
}

InputArea.propTypes = {
  classes: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  showQrScanner: PropTypes.bool,
};

export default injectSheet(styles)(InputArea);
