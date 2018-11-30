import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

/*
 * Link button
 */

const LinkBtnStyles = theme => ({
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

const StyledLinkButton = ({ classes, text, to, style, external, onPress }) =>
  external ? (
    <a
      style={style ? style : undefined}
      target="_blank"
      rel="noopener noreferrer"
      href={to}
      className={classes.wrapper}
    >
      {text}
    </a>
  ) : (
    <span
      style={style ? style : undefined}
      className={classes.wrapper}
      onClick={() => onPress()}
    >
      {text}
    </span>
  );

StyledLinkButton.propTypes = {
  classes: PropTypes.object,
  external: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

export const LinkButton = injectSheet(LinkBtnStyles)(StyledLinkButton);
