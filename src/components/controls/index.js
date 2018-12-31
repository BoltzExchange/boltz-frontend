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
  controls: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  text: { color: '#fff', fontWeight: '300' },
  nextIcon: {
    paddingRight: '10px',
    height: '30px',
    width: '30px',
    color: theme.colors.white,
  },
});

const Controls = ({
  classes,
  text,
  onPress,
  loading,
  loadingText,
  loadingStyle,
}) => {
  return (
    <View
      className={classes.wrapper}
      onClick={loading ? null : () => onPress()}
    >
      <View className={classes.controls}>
        <h1 className={loading ? loadingStyle : classes.text}>
          {loading ? loadingText : text}
        </h1>
      </View>
      <MdArrowForward className={classes.nextIcon} />
    </View>
  );
};

Controls.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  loadingStyle: PropTypes.string,
};

export default injectSheet(styles)(Controls);
