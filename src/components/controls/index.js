import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import View from '../view';
import { MdArrowForward } from 'react-icons/md';
import Loader from 'react-loader-spinner';

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
  spinner: {
    marginRight: '20px',
  },
});

const Controls = ({ classes, text, onPress, loading, loadingText }) => {
  return (
    <View
      className={classes.wrapper}
      onClick={loading ? null : () => onPress()}
    >
      <View className={classes.controls}>
        <h1 className={classes.text}>{loading ? loadingText : text}</h1>
      </View>
      {loading ? (
        <View className={classes.spinner}>
          <Loader type="TailSpin" color="#fff" height={50} width={50} />
        </View>
      ) : (
        <MdArrowForward className={classes.nextIcon} />
      )}
    </View>
  );
};

Controls.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
};

export default injectSheet(styles)(Controls);
