import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = theme => ({
  wrapper: {
    border: 'none',
    resize: 'none',
    fontSize: '18px',
    borderRadius: '3px',
    padding: '6px 12px',
    wordBreak: 'break-all',
    width: p => `${p.width}px`,
    height: p => `${p.height}px`,
    outline: p => (p.error ? '1px solid red' : 'none'),
    backgroundColor: theme.colors.lightGrey,
  },
});

const InputArea = ({
  classes,
  autoFocus,
  height,
  width,
  onChange,
  value,
  placeholder,
}) => (
  <textarea
    autoFocus={autoFocus}
    value={value}
    placeholder={placeholder}
    className={classes.wrapper}
    rows={height}
    cols={width}
    onChange={e => onChange(e.target.value)}
  />
);

InputArea.propTypes = {
  classes: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

export default injectSheet(styles)(InputArea);
