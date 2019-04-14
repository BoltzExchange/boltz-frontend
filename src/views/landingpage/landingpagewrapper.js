import React from 'react';
import PropTypes from 'prop-types';
import { requestProvider } from 'webln';
import { notificationData } from '../../utils';

class LandingPageWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.notificationDom = React.createRef();
  }

  componentDidMount = () => {
    this.props.getPairs();
    try {
      requestProvider().then(provider => {
        this.webln = provider;
      });
    } catch (error) {
      console.log(`Could not enable WebLN: ${error}`);
    }
  };

  componentDidUpdate = () => {
    if (this.props.errorMessage) {
      this.addNotification(this.props.errorMessage, 0);
    }
  };

  addNotification = (info, type) => {
    this.notificationDom.current.addNotification(notificationData(info, type));
  };

  toggleModal = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  };

  render() {
    return this.props.children({
      ...this.props,
      isOpen: this.state.isOpen,
      toggleModal: this.toggleModal,
      notificationDom: this.notificationDom,
      webln: this.webln,
    });
  }
}

LandingPageWrapper.propTypes = {
  children: PropTypes.node,
  errorMessage: PropTypes.object,
  getPairs: PropTypes.func.isRequired,
  classes: PropTypes.object,
  initSwap: PropTypes.func.isRequired,
  initReverseSwap: PropTypes.func.isRequired,
  fees: PropTypes.object.isRequired,
  rates: PropTypes.object.isRequired,
  limits: PropTypes.object.isRequired,
  currencies: PropTypes.array.isRequired,
};

export default LandingPageWrapper;
