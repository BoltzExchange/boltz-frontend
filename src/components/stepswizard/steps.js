import React from 'react';
import PropTypes from 'prop-types';
import View from '../view';

const Step = ({ render, stage, num }) => {
  if (stage === num) {
    return render();
  } else return null;
};

Step.propTypes = {
  num: PropTypes.number,
  stage: PropTypes.number,
  render: PropTypes.func,
};

const Steps = ({ style, stage, children }) => {
  const steps = React.Children.map(children, child => {
    return React.cloneElement(child, {
      stage,
    });
  });
  return <View className={style.content}>{steps}</View>;
};

Steps.propTypes = {
  children: PropTypes.children,
  style: PropTypes.object,
  stage: PropTypes.number,
};

export { Step };
export default Steps;
