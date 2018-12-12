import React from 'react';
import PropTypes from 'prop-types';
import View from '../view';
import { MdArrowForward } from 'react-icons/md';

const styles = {
  wrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  controls: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  loading: { color: '#fff', fontWeight: '300' },
  nextIcon: {
    paddingRight: '10px',
    height: '30px',
    width: '30px',
    color: '#fff',
  },
};

const Controls = ({ text, onPress, loading }) => (
  <View style={styles.wrapper} onClick={loading ? null : () => onPress()}>
    <View style={styles.controls}>
      {loading ? (
        <h1 style={styles.loading}>Loading...</h1>
      ) : (
        <h1 style={styles.loading}>{text}</h1>
      )}
    </View>
    <MdArrowForward style={styles.nextIcon} />
  </View>
);

Controls.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
};

export default Controls;
