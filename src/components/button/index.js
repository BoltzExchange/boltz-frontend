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

const Button = ({ classes, text, to, style, external, onPress }) =>
  external ? (
    <Link text={text} style={style} to={to} className={classes.wrapper} />
  ) : (
    <span style={style} className={classes.wrapper} onClick={() => onPress()}>
      {text}
    </span>
  );

Button.propTypes = {
  classes: PropTypes.object,
  external: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

export default injectSheet(ButtonStyles)(Button);
