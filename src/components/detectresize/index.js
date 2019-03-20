import React from 'react';
import PropTypes from 'prop-types';

class DetectResize extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

  handelResize = e => {
    // TODO: we should limit the amount of times this is called per second
    this.setState({ width: e.target.innerWidth });
  };

  componentDidMount = () => {
    window.addEventListener('resize', this.handelResize, false);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handelResize, false);
  };

  render() {
    return this.props.children(this.state.width);
  }
}

DetectResize.propTypes = {
  children: PropTypes.node,
};

export default DetectResize;
