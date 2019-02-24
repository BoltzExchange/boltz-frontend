import React from 'react';
import PropTypes from 'prop-types';

const View = ({
  children,
  style,
  className,
  onClick,
  inputRef,
  ...otherProps
}) => {
  let newStyle = {
    display: otherProps.noFlex ? 'block' : 'flex',
  };
  if (style !== undefined) {
    newStyle = { ...newStyle, ...style };
  }

  return (
    <div
      className={className}
      style={newStyle}
      onClick={onClick}
      ref={inputRef}
      {...otherProps}
    >
      {children}
    </div>
  );
};

View.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
  otherProps: PropTypes.array,
  inputRef: PropTypes.string,
};

export default View;
