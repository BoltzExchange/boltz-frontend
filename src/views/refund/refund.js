import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { FaArrowRight } from 'react-icons/fa';
import Background from '../../components/background';
import TaskBar from '../../components/taskbar';
import DialogBox from '../../components/dialogbox';
import View from '../../components/view';

const styles = () => ({
  wrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

const Content = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <p style={{ fontSize: '36px', color: '#505050' }}>
      Choose the refund JSON file <br /> or drag it here.
    </p>
  </View>
);

const Controls = () => (
  <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
    <FaArrowRight size={40} color={'#FFF'} style={{ padding: '10px' }} />
  </View>
);

const Refund = ({ classes }) => (
  <Background>
    <TaskBar />
    <View className={classes.wrapper}>
      <DialogBox content={() => <Content />} controls={() => <Controls />} />
    </View>
  </Background>
);

Refund.propTypes = {
  classes: PropTypes.object,
};

export default injectSheet(styles)(Refund);
