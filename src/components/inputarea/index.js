import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = theme => ({
  wrapper: {
    resize: 'none',
    width: p => `${p.width}px`,
    height: p => `${p.height}px`,
    padding: '6px 12px',
    outline: 'none',
    backgroundColor: theme.colors.lightGrey,
    fontSize: '18px',
    border: 'none',
    borderRadius: '3px',
  },
});

const InputArea = ({ classes, height, width, onChange }) => (
  <textarea
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
};

export default injectSheet(styles)(InputArea);
