import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import Link from '../link';
/*
 * Link button
 */

const ButtonStyles = theme => ({
  wrapper: {
    padding: '10px',
    color: theme.colors.white,
    fontSize: theme.fontSize.sizeXL,
    textDecoration: 'none',
    transition: '0.3s',
    '&:hover': {
      cursor: 'pointer',
      color: theme.colors.lightGrey,
    },
  },
});

const Button = ({ classes, className, text, to, external, onPress }) => {
  const style = className ? `${classes.wrapper} ${className}` : classes.wrapper;
  return external ? (
    <Link text={text} to={to} className={style} />
  ) : (
    <span className={style} onClick={() => onPress()}>
      {text}
    </span>
  );
};

Button.propTypes = {
  classes: PropTypes.object,
  external: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  className: PropTypes.string,
};

export default injectSheet(ButtonStyles)(Button);
