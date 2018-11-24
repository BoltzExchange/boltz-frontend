import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const fileBtnStyles = () => ({
  wrapper: {
    width: '206px',
    height: '50px',
  },
});

const StyledFileButton = ({ classes, title }) => (
  <input type="file" className={classes.wrapper}>
    {title}
  </input>
);

StyledFileButton.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export const FileButton = injectSheet(fileBtnStyles)(StyledFileButton);
