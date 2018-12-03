import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = theme => ({
  wrapper: {
    width: '150px',
    height: '50px',
    border: 'none',
    borderRadius: '3px',
    textAlign: 'center',
    fontSize: theme.fontSize.sizeM,
    padding: '5px',
    '&:focus': {
      outline: 'none',
    },
  },
});

const DropDown = ({ classes, fields, onChange }) => {
  return (
    <select
      className={classes.wrapper}
      onChange={e => onChange(e.target.value)}
    >
      {fields.map((field, i) => (
        <option key={i} value={field}>
          {field}
        </option>
      ))}
    </select>
  );
};

DropDown.propTypes = {
  classes: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  fields: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};
export default injectSheet(styles)(DropDown);
