import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = theme => ({
  wrapper: {
    textAlign: 'center',
    fontSize: theme.fontSize.sizeM,
    border: 'none',
    borderRadius: '2px',
    margin: '5px',
    backgroundColor: theme.colors.lightGrey,
    width: '200px',
    height: '50px',
    outline: p => (p.error ? '1px solid red' : 'none'),
  },
});

class Input extends React.PureComponent {
  onChange = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    const { classes, className, disable, min, max, value, step } = this.props;
    const classname = className
      ? `${classes.wrapper} ${className}`
      : classes.wrapper;

    return (
      <input
        disabled={disable}
        step={step}
        min={min}
        max={max}
        className={classname}
        onChange={e => this.onChange(e)}
        value={value}
        type={'number'}
      />
    );
  }
}

Input.defaultProps = {
  min: 0,
  step: 1,
};

Input.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disable: PropTypes.bool,
  error: PropTypes.bool,
  min: PropTypes.string,
  max: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.string,
};

export default injectSheet(styles)(Input);
