import React from 'react';
import Qrious from 'qrious';
import PropTypes from 'prop-types';

class QrCode extends React.Component {
  componentDidMount() {
    const { size, link } = this.props;
    this.qr = new Qrious({
      element: document.getElementById('qr'),
    });
    this.qr.set({
      background: 'white',
      backgroundAlpha: 1,
      foreground: 'black',
      foregroundAlpha: 1,
      level: 'H',
      padding: 1,
      size,
      value: link,
    });
  }
  render() {
    return <canvas id={'qr'} />;
  }
}

QrCode.propTypes = {
  size: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
};

export default QrCode;
