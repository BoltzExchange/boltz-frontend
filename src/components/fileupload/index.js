import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { readFile } from '../../utils';

const fileBtnStyles = theme => ({
  wrapper: {
    position: 'relative',
    width: '260px',
    height: '50px',
    border: 'none',
    outline: 'none',
    backgroundColor: theme.colors.lightGrey,
    color: theme.colors.tundoraGrey,
    textAlign: 'center',
    lineHeight: '50px',
    borderRadius: '3px',
    fontSize: '30px',
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: '0',
    width: '100%',
    height: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const FileUpload = ({ classes, text, onFileRead }) => (
  <div className={classes.wrapper}>
    {text}
    <input
      className={classes.input}
      onChange={event => {
        readFile(event.target.files[0], content => {
          onFileRead(content);
        });
      }}
      type="file"
    />
  </div>
);

FileUpload.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  onFileRead: PropTypes.func.isRequired,
};

export default injectSheet(fileBtnStyles)(FileUpload);
