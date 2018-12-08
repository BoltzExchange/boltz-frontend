import React, { Component } from 'react';
import BackArrow from '../../asset/icons/back_arrow.png';
// import { FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import ProgressBar from '../progressbar';
import Steps, { Step } from './steps';
import Controls, { Control } from './controls';

const styles = theme => ({
  wrapper: {
    height: '600px',
    width: '900px',
    boxShadow: '0px 0px 30px -6px rgba(0,0,0,0.52)',
    backgroundColor: p => (p.dark ? theme.colors.aeroBlue : theme.colors.white),
    flexDirection: 'column',
  },
  progress: {
    width: '100%',
    height: '10%',
    backgroundColor: p => (p.dark ? theme.colors.aeroBlue : theme.colors.white),
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: '75%',
  },
  controls: {
    width: '100%',
    height: '15%',
    backgroundColor: theme.colors.matisseBlue,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  backButton: {
    padding: '10px',
    width: '29px',
    height: '24px',
    objectFit: 'contain',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

class StepsWizard extends Component {
  constructor(props) {
    super(props);
    this.progressInterval = this.initProgress();
    this.state = {
      stage: this.props.stage,
      progress: this.progressInterval,
    };
  }

  static Steps = Steps;
  static Step = Step;
  static Controls = Controls;
  static Control = Control;

  initProgress = () => {
    return 100 / this.props.range;
  };

  nextStage = () => {
    if (this.state.progress !== 100) {
      this.setState(pre => ({
        stage: pre.stage + 1,
        progress: pre.progress + this.progressInterval,
      }));
    }
  };

  prevStage = () => {
    if (this.state.progress !== this.progress) {
      this.setState(pre => ({
        stage: pre.stage - 1,
        progress: pre.progress - this.progressInterval,
      }));
    }
  };

  render() {
    const { stage } = this.state;
    const { classes, onExit, range } = this.props;
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        stage,
        range,
        nextStage: this.nextStage,
        style: classes,
        onExit: onExit,
      });
    });
    return (
      <View className={classes.wrapper}>
        <View className={classes.progress}>
          {onExit ? (
            <img
              className={classes.backButton}
              src={BackArrow}
              onClick={() => (stage !== 1 ? this.prevStage() : onExit())}
            />
          ) : null}
          <ProgressBar progress={this.state.progress} />
        </View>
        {children}
      </View>
    );
  }
}

StepsWizard.propTypes = {
  children: PropTypes.children,
  classes: PropTypes.object,
  onExit: PropTypes.func,
  onClick: PropTypes.func,
  await: PropTypes.bool,
  alertOnExit: PropTypes.bool,
  onExitmessage: PropTypes.oneOfType(PropTypes.string, PropTypes.func),
  stage: PropTypes.number,
  range: PropTypes.number,
  dark: PropTypes.bool,
};

export default injectSheet(styles)(StepsWizard);
