import React from 'react';
import PropTypes from 'prop-types';
import { Loader as ReactLoaderSpinner } from 'react-loader-spinner';

const Loader = ({ width, height, color, style, ...other }) => {
  let newStyle = { marginRight: '5px' };
  if (style !== undefined) {
    newStyle = { ...newStyle, ...style };
  }
  return (
    <ReactLoaderSpinner
      style={newStyle}
      type="TailSpin"
      color={color ? color : '#fff'}
      height={height ? height : 50}
      width={width ? width : 50}
      {...other}
    />
  );
};

Loader.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
  other: PropTypes.object,
};

export default Loader;
