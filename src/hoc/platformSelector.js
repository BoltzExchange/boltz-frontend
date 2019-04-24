import React from 'react';
import PropTypes from 'prop-types';

class PlatformSelector extends React.Component {
  constructor() {
    super();
    this.state = { width: window.innerWidth };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  isMobileBrowser = () => {
    return (
      typeof window.orientation !== 'undefined' ||
      navigator.userAgent.indexOf('IEMobile') !== -1
    );
  };

  render() {
    if (this.state.width < 768) {
      return this.props.mobile;
    } else {
      return this.props.desktop;
    }
  }
}

PlatformSelector.propTypes = {
  children: PropTypes.node,
  mobile: PropTypes.object,
  desktop: PropTypes.object,
};

export default PlatformSelector;
