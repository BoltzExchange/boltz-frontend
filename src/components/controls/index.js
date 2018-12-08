import React from 'react';
import PropTypes from 'prop-types';
import View from '../view';
import NextArrow from '../../asset/icons/next_arrow.png';

const styles = {
  wrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  controls: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  loading: { color: '#fff', fontWeight: '300' },
  nextIcon: { paddingRight: '10px', heigt: '25px', width: '25px' },
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
    <img src={NextArrow} style={styles.nextIcon} />
  </View>
);

Controls.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
};

export default Controls;
