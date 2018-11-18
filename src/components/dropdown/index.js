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

const DropDown = ({ classes, fields }) => {
  return (
    <select className={classes.wrapper}>
      {fields.map((field, i) => (
        <option key={i} value={`${field}-${i}`}>
          {field}
        </option>
      ))}
    </select>
  );
};

DropDown.propTypes = {
  classes: PropTypes.object,
  fields: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};
export default injectSheet(styles)(DropDown);
