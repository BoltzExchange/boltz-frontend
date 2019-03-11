import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ text, className, to, openNew = true }) => (
  <a
    className={className}
    rel="noopener noreferrer"
    target={openNew ? '_blank' : '_self'}
    href={to}
  >
    {text}
  </a>
);

Link.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  openNew: PropTypes.bool,
};

export default Link;
