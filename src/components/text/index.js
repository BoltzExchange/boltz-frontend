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
    fontSize: '18px',
    fontWeight: 600,
    '@media (max-width: 1500px)': {
      fontSize: '16px',
    },
    '@media (max-width: 320px)': {
      fontSize: '12px',
    },
  },
  text: {
    fontSize: '12px',
    fontWeight: 400,
  },
});

const StyledInfoText = ({ title, text, lineTwo, classes, style }) => (
  <View className={classes.wrapper}>
    <Text text={`${title}:`} className={classes.title} style={style} />
    <Text text={text} className={classes.text} style={style} />
    {lineTwo !== undefined ? (
      <Text text={lineTwo} className={classes.text} style={style} />
    ) : (
      undefined
    )}
  </View>
);

StyledInfoText.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  lineTwo: PropTypes.string,
  style: PropTypes.object,
};

const InfoText = injectSheet(infoTextStyles)(StyledInfoText);

export default Text;

export { InfoText };
