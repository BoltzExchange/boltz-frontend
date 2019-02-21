import React from 'react';
import View from '../view';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = theme => ({
  wrapper: {
    height: 'auto',
    width: p => p.width,
    flexDirection: 'column',
    backgroundColor: theme.colors.white,
    margin: '20px',
    padding: '10px',
  },
  title: {
    color: theme.colors.black,
    fontSize: '25px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'condensed',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
  content: {
    fontSize: '20px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'condensed',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: theme.colors.tundoraGrey,
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
