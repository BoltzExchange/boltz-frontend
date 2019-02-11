import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import View from '../view';
import { MdArrowForward } from 'react-icons/md';

const styles = theme => ({
  wrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: p => (p.loading ? theme.colors.tundoraGrey : 'none'),
  },
  error: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.red,
  },
  controls: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  text: { color: '#fff', fontWeight: '300' },
  errorCommand: {
    fontSize: '25px',
    paddingRight: '10px',
    color: theme.colors.white,
  },
  nextIcon: {
    paddingRight: '10px',
    height: '30px',
    width: '30px',
    color: theme.colors.white,
  },
  spinner: {
    marginRight: '20px',
  },
  icon: {
    marginRight: '10px',
  },
});

// TODO: refactor to use render props due to complexity
const Controls = ({
  classes,
  text,
  onPress,
  error,
  errorText,
  errorAction,
  errorRender,
  loading,
  loadingText,
  loadingStyle,
  loadingRender,
}) => {
  const loadingStyleSelect = loadingStyle ? loadingStyle : classes.text;
  const loadingTextSelect = loadingText ? loadingText : text;
  return (
    <View
      className={error ? classes.error : classes.wrapper}
      onClick={loading ? null : () => onPress()}
    >
      <View className={classes.controls}>
        {error ? (
          <h1 className={classes.text}> {errorText} </h1>
        ) : (
          <h1 className={loading ? loadingStyleSelect : classes.text}>
            {loading ? loadingTextSelect : text}
          </h1>
        )}
      </View>
      <View className={classes.icon}>
        {error ? (
          errorRender ? (
            errorRender(classes.errorCommand, errorAction)
          ) : (
            <span
              className={classes.errorCommand}
              onClick={() => errorAction()}
            >
              Retry
            </span>
          )
        ) : loading && loadingRender ? (
          loadingRender()
        ) : (
          <MdArrowForward className={classes.nextIcon} />
        )}
      </View>
    </View>
  );
};

Controls.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  errorAction: PropTypes.func,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  loadingStyle: PropTypes.string,
  loadingRender: PropTypes.func,
  errorRender: PropTypes.func,
};

export default injectSheet(styles)(Controls);
