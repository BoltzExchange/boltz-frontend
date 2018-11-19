import React from 'react';
import PropTypes from 'prop-types';
import View from '../view';

const Control = ({ render, stage, num }) => {
  if (stage === num) {
    return render();
  } else return null;
};

Control.propTypes = {
  num: PropTypes.number,
  stage: PropTypes.number,
  render: PropTypes.func,
};

const Controls = ({ style, stage, children, nextStage }) => {
  const steps = React.Children.map(children, child => {
    return React.cloneElement(child, {
      stage,
    });
  });
  return (
    <View className={style.controls} onClick={() => nextStage()}>
      {steps}
    </View>
  );
};

Controls.propTypes = {
  children: PropTypes.children,
  style: PropTypes.object,
  stage: PropTypes.number,
  nextStage: PropTypes.func,
};

export { Control };
export default Controls;
