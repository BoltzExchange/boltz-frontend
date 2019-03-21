import React from 'react';
import View from '../view';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = theme => ({
  wrapper: {
    height: 'auto',
    flexDirection: 'column',
    backgroundColor: theme.colors.white,
    margin: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    padding: '10px',
    '@media (max-width: 425px)': {
      width: '300px',
    },
  },
  title: {
    color: theme.colors.black,
    fontSize: '25px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'condensed',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    '@media (max-width: 768px)': {
      fontSize: '20px',
    },
    '@media (max-width: 425px)': {
      fontSize: '16px',
    },
  },
  content: {
    fontSize: '20px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'condensed',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: theme.colors.tundoraGrey,
    '@media (max-width: 768px)': {
      fontSize: '18px',
    },
    '@media (max-width: 425px)': {
      fontSize: '14px',
    },
  },
});

const Question = ({ classes, title, content }) => (
  <View className={classes.wrapper}>
    {title(classes.title)}
    {content(classes.content)}
  </View>
);

Question.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string.isRequired,
  content: PropTypes.func.isRequired,
  width: PropTypes.any,
};

export default injectSheet(styles)(Question);
