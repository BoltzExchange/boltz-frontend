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
    '@media (min-width: 320px)': {
      fontSize: '12px',
    },
  },
  text: {
    fontSize: '12px',
    fontWeight: 400,
    '@media (min-width: 1500px)': {
      fontSize: '16px',
    },
    '@media (min-width: 320px)': {
      fontSize: '12px',
    },
  },
});

const StyledInfoText = ({ title, text, classes, style }) => (
  <View className={classes.wrapper}>
    <Text text={`${title}:`} className={classes.title} style={style} />
    <Text text={text} className={classes.text} style={style} />
  </View>
);

StyledInfoText.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
};

const InfoText = injectSheet(infoTextStyles)(StyledInfoText);

const MobileInfoTextStyled = ({ classes, title, text }) => (
  <View className={classes.wrapper}>
    <Text text={`${title}:`} />
    <Text text={text} />
  </View>
);

const MobileInfoTextStyles = theme => ({
  wrapper: {
    flex: '1 1 content',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.white,
    padding: '20px',
  },
});

MobileInfoTextStyled.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
};

const MobileInfoText = injectSheet(MobileInfoTextStyles)(MobileInfoTextStyled);
export default Text;

export { InfoText, MobileInfoText };
