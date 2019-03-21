import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { MdArrowForward } from 'react-icons/md';
import View from '../view';

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
  text: {
    color: '#fff',
    fontWeight: '300',
    '@media (max-width: 425px)': {
      fontSize: p => (p.mobile ? '20px' : undefined),
    },
  },
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
      onClick={loading || error ? undefined : () => onPress()}
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
      {error ? (
        errorRender ? (
          errorRender(classes.errorCommand, errorAction)
        ) : (
          <span className={classes.errorCommand} onClick={() => errorAction()}>
            Retry
          </span>
        )
      ) : loading && loadingRender ? (
        loadingRender()
      ) : (
        <MdArrowForward className={classes.nextIcon} />
      )}
    </View>
  );
};

Controls.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  error: PropTypes.bool,
  errorAction: PropTypes.func,
  errorText: PropTypes.string,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  loadingStyle: PropTypes.string,
  loadingRender: PropTypes.func,
  errorRender: PropTypes.node,
  mobile: PropTypes.bool,
};

export default injectSheet(styles)(Controls);
