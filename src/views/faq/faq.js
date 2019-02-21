import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../../components/view';
import TaskBar from '../../components/taskbar';
import Question from '../../components/question';
import NodeInfo from '../../components/nodeinfo';
import BackGround from '../../components/background';
import { bitcoinLnd } from '../../constants';

const styles = theme => ({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.white,
    fontSize: '42px',
  },
  tab: {
    width: '800px',
    flex: 1,
    flexDirection: 'column',
  },
  questionTab: {
    backgroundColor: theme.colors.white,
    minWidth: '820px',
    maxWidth: '920px',
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.5)',
  },
  questionTitle: {
    marginBottom: '0px',
  },
});

const whatIsBoltz =
  'Boltz is an instant and non custodial crypto currency exchange' +
  'that focuses on the adoption of second layer scaling technologies' +
  'like the Lightning network and the privacy of its users. We' +
  'neither use any trackers nor log any data that could identify our' +
  'users.' +
  'Please note that Boltz is currently in its alpha stage so' +
  'dont be too reckless when using it. If you experience any' +
  'issues or have some feedback feel free to' +
  'contact us.';

const howToOpen =
  'We appreciate an channels you open with out Lightning nodes' +
  'and on request we will also open one to you!';

class Faq extends React.Component {
  render() {
    const { classes, goHome, goRefund, goFaq } = this.props;

    document.body.style.overflowX = 'hidden';

    return (
      <BackGround>
        <TaskBar goHome={goHome} goRefund={goRefund} goFaq={goFaq} />
        <View className={classes.wrapper}>
          <View className={classes.titleWrapper}>
            <h1 className={classes.title}>FAQ&apos;s</h1>
          </View>
          <View className={classes.questionTab}>
            <Question
              title={style => <h1 className={style}>What is Boltz?</h1>}
              content={style => <p className={style}>{whatIsBoltz}</p>}
              width={'auto'}
            />
            <Question
              title={style => (
                <h1 className={style}>How to open a lightning channel?</h1>
              )}
              content={style => <p className={style}>{howToOpen}</p>}
              width={'auto'}
            />
            <NodeInfo name={'BTC LND NODE'} size={200} uri={bitcoinLnd} />
          </View>
        </View>
      </BackGround>
    );
  }
}

Faq.propTypes = {
  classes: PropTypes.object.isRequired,
  goHome: PropTypes.func.isRequired,
  goRefund: PropTypes.func.isRequired,
  goFaq: PropTypes.func.isRequired,
};

export default injectSheet(styles)(Faq);
