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

class DropDown extends React.Component {
  state = {
    value: undefined,
  };

  render() {
    let { value } = this.state;
    const { classes, onChange, defaultValue, fields } = this.props;

    if (value === undefined) {
      value = defaultValue;
    }

    return (
      <select
        value={value}
        className={classes.wrapper}
        onChange={e => {
          const value = e.target.value;

          onChange(value);
          this.setState({ value });
        }}
      >
        {fields.map((field, i) => (
          <option key={i} value={field}>
            {field}
          </option>
        ))}
      </select>
    );
  }
}

DropDown.propTypes = {
  classes: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
  fields: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default injectSheet(styles)(DropDown);
