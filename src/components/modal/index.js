import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';

const ModalComponent = ({ isOpen, onClose, children }) => (
  <Modal open={isOpen} onClose={onClose} center>
    {children}
  </Modal>
);

ModalComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default ModalComponent;
