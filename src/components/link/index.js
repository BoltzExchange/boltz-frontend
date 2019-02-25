import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ text, style, className, to, openNew = true }) => (
  <a
    style={style}
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
  style: PropTypes.object,
  className: PropTypes.any,
  to: PropTypes.string.isRequired,
  openNew: PropTypes.bool,
};

export default Link;
