import React from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router';

const NavPrompt = ({ shouldAlert, message }) => (
  <Prompt when={shouldAlert} message={message} />
);

NavPrompt.propTypes = {
  shouldAlert: PropTypes.bool.isRequired,
  message: PropTypes.oneOfType(PropTypes.func, PropTypes.string).isRequired,
};

export default NavPrompt;
