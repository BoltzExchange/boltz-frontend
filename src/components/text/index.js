import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import View from '../view';

// TODO: refactor the generic text types
const Text = ({ text, style, className }) => (
  <span className={className} style={{ ...style }}>
    {text}
  </span>
);

Text.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  style: PropTypes.object,
};

const infoTextStyles = () => ({
  wrapper: {
    flexDirection: 'column',
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    '@media (min-width: 1500px)': {
      fontSize: '18px',
    },
  },
  text: {
    fontSize: '12px',
    fontWeight: 400,
    '@media (min-width: 1500px)': {
      fontSize: '16px',
    },
  },
});

const StyledInfoText = ({ title, text, classes }) => (
  <View className={classes.wrapper}>
    <Text text={title} className={classes.title} />
    <Text text={text} className={classes.text} />
  </View>
);

StyledInfoText.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
};

const InfoText = injectSheet(infoTextStyles)(StyledInfoText);

export default Text;

export { InfoText };
