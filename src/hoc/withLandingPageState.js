import React from 'react';
import PropTypes from 'prop-types';
import { requestProvider } from 'webln';
import { notificationData } from '../utils';

const withLandingPageState = WrappedComponent => {
  class WrapperComponent extends React.Component {
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
      this.notificationDom.current.addNotification(
        notificationData(info, type)
      );
    };

    toggleModal = () => {
      this.setState(prev => ({ isOpen: !prev.isOpen }));
    };

    render() {
      return (
        <WrappedComponent
          isOpen={this.state.isOpen}
          toggleModal={this.toggleModal}
          notificationDom={this.notificationDom}
          webln={this.webln}
          {...this.props}
        />
      );
    }
  }

  WrapperComponent.propTypes = {
    errorMessage: PropTypes.object,
    getPairs: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    initSwap: PropTypes.func.isRequired,
    initReverseSwap: PropTypes.func.isRequired,

    fees: PropTypes.object.isRequired,
    rates: PropTypes.object.isRequired,
    limits: PropTypes.object.isRequired,
    currencies: PropTypes.array.isRequired,
  };
  return WrapperComponent;
};

export default withLandingPageState;
