import React from 'react';
import PropTypes from 'prop-types';
import View from '../view';

const Control = props => {
  const { stage, num, render } = props;
  if (stage === num) {
    return render(props);
  } else return null;
};

Control.propTypes = {
  num: PropTypes.number,
  stage: PropTypes.number,
  render: PropTypes.func,
};

class Controls extends React.Component {
  render() {
    const { children, style } = this.props;
    const steps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        ...this.props,
      });
    });

    return <View className={style.controls}>{steps}</View>;
  }
}

Controls.propTypes = {
  nextStage: PropTypes.func,
  disable: PropTypes.bool,
  canExit: PropTypes.bool,
  onExit: PropTypes.func,
  children: PropTypes.children,
  style: PropTypes.object,
  stage: PropTypes.number,
  range: PropTypes.number,
};

export { Control };
export default Controls;
