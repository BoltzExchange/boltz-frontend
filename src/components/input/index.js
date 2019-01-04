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

class Input extends React.Component {
  static getDerivedStateFromProps = nextProps => {
    if (nextProps.value && nextProps.disable) {
      return { value: nextProps.value };
    }
  };

  onChange = e => {
    this.setState({ value: e.target.value }, () => {
      this.props.onChange(this.state.value);
    });
  };

  render() {
    const { classes, style, disable, min, max, value, step } = this.props;

    return (
      <input
        disabled={disable}
        step={step}
        min={min}
        max={max}
        style={style ? style : undefined}
        className={classes.wrapper}
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
  onChange: PropTypes.func,
  style: PropTypes.object,
  disable: PropTypes.bool,
  error: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  step: PropTypes.number,
};

export default injectSheet(styles)(Input);
