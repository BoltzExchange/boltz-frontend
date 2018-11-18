import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/*
 * Link button
 */

const styles = theme => ({
  wrapper: {
    padding: '10px',
    color: theme.colors.white,
    fontSize: theme.fontSize.sizeXL,
    textDecoration: 'none',
    transition: '0.3s',
    '&:hover': {
      color: theme.colors.lightGray,
    },
  },
});

const StyledLinkButton = ({ classes, text, to, style }) => {
  return (
    <Link style={style ? style : undefined} className={classes.wrapper} to={to}>
      {text}
    </Link>
  );
};

StyledLinkButton.propTypes = {
  classes: PropTypes.object,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export const LinkButton = injectSheet(styles)(StyledLinkButton);
