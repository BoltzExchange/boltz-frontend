import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../../components/view';
import TaskBar from '../../components/taskbar';
import NodeInfo from '../../components/nodeinfo';
import BackGround from '../../components/background';

const twitterLink = 'https://twitter.com/boltzhq';

const styles = theme => ({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    width: '800px',
    marginTop: '20px',
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingStart: '50px',
    paddingEnd: '50px',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    '@media (min-width: 1500px)': {
      width: '1000px',
    },
  },
  questionTitle: {
    marginBottom: '0px',
  },
});

class Faq extends React.Component {
  render() {
    const { classes, goHome, goRefund, goFaq } = this.props;

    document.body.style.overflowX = 'hidden';

    return (
      <BackGround>
        <TaskBar goHome={goHome} goRefund={goRefund} goFaq={goFaq} />
        <View className={classes.wrapper}>
          <View className={classes.tab}>
            <h1>Boltz FAQ</h1>

            <h2 className={classes.questionTitle}>What is Boltz?</h2>
            <p>
              Boltz is an instant and non custodial crypto currency exchange
              that focuses on the adoption of second layer scaling technologies
              like the Lightning network and the privacy of its users. We
              neither use any trackers nor log any data that could identify our
              users.{' '}
              <b>Please note that Boltz is currently in its alpha stage</b> so
              so {`don't`} be too reckless when using it. If you experience any
              issues or have some feedback feel free to{' '}
              <a href={twitterLink}>contact us</a>.
            </p>

            <h2 className={classes.questionTitle}>
              How to open Lightning channels with Boltz?
            </h2>
            <p>
              We appreciate any channels you open with our Lightning nodes and{' '}
              <a href={twitterLink}>on request</a> we will also open one to you:
            </p>

            <NodeInfo
              name={'Bitcoin LND node'}
              uri={
                '026165850492521f4ac8abd9bd8088123446d126f648ca35e60f88177dc149ceb2@104.196.200.39:9735'
              }
            />

            <NodeInfo
              name={'Litecoin LND node'}
              uri={
                '02a4cb9d9c40ab508be3641a3b42be249e7cacfc7fea600485f9e37e46382aaa49@104.196.200.39:10735'
              }
            />

            <h2 className={classes.questionTitle}>
              Why should one use a non custodial exchange?
            </h2>
            <p>
              Non custodial exchanges give you full control over your funds. All
              trades on Boltz are executed in a way that we cannot steal any
              money from you. Period. Either the trade happens entirely and you
              get the exact amount of the asset you were promised or you will be
              able to do a refund. This concept is called <i>atomicity</i> and
              you can read more about this in{' '}
              <a
                href={'https://medium.com/boltzhq/submarine-swaps-c509ce0fb1db'}
              >
                our blog post about how Boltz works
              </a>
              .
            </p>
            <p>
              If you are <i>really</i> technical you can proof read our source
              code and verify that the claims above are valid because everything
              is open source and can be found on{' '}
              <a href={'https://github.com/boltzexchange'}>our GitHub</a>. Also
              we will soon add a version of our frontend that you can host
              yourself easily.
            </p>

            <h2 className={classes.questionTitle}>
              What wallets are supported by Boltz?
            </h2>
            <p>
              All regular and Lightning wallets are supported by Boltz. Although
              we recommend users to run a full node and manage their own keys,
              there are custodial wallets solutions, like{' '}
              <a href={'https://bluewallet.io/'}>BlueWallet</a>, that can make
              testing Boltz very easy.
            </p>
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
