import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import ProgressBar from '../progressbar';

const styles = theme => ({
  wrapper: {
    height: '600px',
    width: '900px',
    boxShadow: '0px 0px 30px -6px rgba(0,0,0,0.52)',
    backgroundColor: theme.colors.white,
    flexDirection: 'column',
  },
  progress: {
    width: '100%',
    height: '10%',
    backgroundColor: theme.colors.white,
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
  },
});

class DialogBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navState: 0,
      progress: this.increment(),
    };
  }

  increment = () => {
    return 100 / this.props.steps.length;
  };

  nextState = () => {
    const { navState } = this.state;
    if (navState != this.props.steps.length - 1) {
      this.setState(pre => ({
        navState: pre.navState + 1,
        progress: pre.progress + this.increment(),
      }));
    }
  };

  prevState = () => {
    const { navState } = this.state;
    if (navState != 0) {
      this.setState(pre => ({
        navState: pre.navState - 1,
        progress: pre.progress - this.increment(),
      }));
    }
  };

  render() {
    const { classes, steps, onExit, controls } = this.props;
    const { navState, progress } = this.state;
    return (
      <View className={classes.wrapper}>
        <View className={classes.progress}>
          {onExit ? (
            <FaArrowLeft
              size={30}
              style={{ padding: '10px' }}
              onClick={() => (navState != 0 ? this.prevState() : onExit())}
            />
          ) : null}
          <ProgressBar progress={progress} />
        </View>
        <View className={classes.content}>{steps[navState]}</View>
        <View className={classes.controls} onClick={() => this.nextState()}>
          {() => controls(this.nextState)}
        </View>
      </View>
    );
  }
}

DialogBox.propTypes = {
  classes: PropTypes.object,
  steps: PropTypes.arrayOf(PropTypes.object),
  onExit: PropTypes.func,
  content: PropTypes.func.isRequired,
  controls: PropTypes.func.isRequired,
};

export default injectSheet(styles)(DialogBox);
