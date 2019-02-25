import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../../components/view';
import Link from '../../components/link';
import TaskBar from '../../components/taskbar';
import Question from '../../components/question';
import NodeInfo from '../../components/nodeinfo';
import BackGround from '../../components/background';
import { bitcoinLnd, litecoinLnd } from '../../constants';

const styles = theme => ({
  wrapper: {
    height: 'auto',
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
  questionTab: {
    backgroundColor: theme.colors.white,
    minWidth: '820px',
    maxWidth: '920px',
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.5)',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
});

const twitterLink = 'https://twitter.com/boltzhq';

class Faq extends React.Component {
  render() {
    const { classes, goHome, goRefund, goFaq } = this.props;

    document.body.style.overflowX = 'hidden';

    return (
      <BackGround>
        <TaskBar goHome={goHome} goRefund={goRefund} goFaq={goFaq} />
        <View className={classes.titleWrapper}>
          <h1 className={classes.title}>FAQ&apos;s</h1>
        </View>
        <View className={classes.wrapper}>
          <div className={classes.questionTab}>
            <Question
              title={style => <h1 className={style}>What is Boltz?</h1>}
              content={style => (
                <p className={style}>
                  Boltz is an instant and non custodial crypto currency exchange
                  that focuses on the adoption of second layer scaling
                  technologies like the Lightning network and the privacy of its
                  users. We neither use any trackers nor log any data that could
                  identify our users. <br /> <br />
                  Please note that Boltz is currently in its alpha stage so dont
                  be too reckless when using it. If you experience any issues or
                  have some feedback feel free to{' '}
                  <Link to={twitterLink} text={'contact us'} />.
                </p>
              )}
              width={'auto'}
            />
            <Question
              title={style => (
                <h1 className={style}>
                  How to open Lightning channels with Boltz?
                </h1>
              )}
              content={style => (
                <p className={style}>
                  We appreciate any channels you open with our Lightning nodes
                  and <Link to={twitterLink} text={'on request'} /> we will also
                  open one to you:
                  <NodeInfo name={'BTC LND NODE'} size={150} uri={bitcoinLnd} />
                  <NodeInfo
                    name={'LTC LND NODE'}
                    size={150}
                    uri={litecoinLnd}
                  />
                </p>
              )}
              width={'auto'}
            />
            <Question
              title={style => (
                <h1 className={style}>
                  Why should one use a non custodial exchange?
                </h1>
              )}
              content={style => (
                <p className={style}>
                  Non custodial exchanges give you full control over your funds.
                  All trades on Boltz are executed in a way that we cannot steal
                  any money from you. Period.
                  <br />
                  <br />
                  Either the trade happens entirely and you get the exact amount
                  of the asset you were promised or you will be able to do a
                  refund. This concept is called <i>atomicity</i> and you can
                  read more about this in{' '}
                  <Link
                    to={
                      'https://medium.com/boltzhq/submarine-swaps-c509ce0fb1db'
                    }
                    text={'our blog post about how Boltz works'}
                  />
                  <br />
                  <br />
                  If you are <i>really</i> technical you can proof read our
                  source code and verify that the claims above are valid because
                  everything is open source and can be found on{' '}
                  <Link
                    to={'https://github.com/boltzexchange'}
                    text={'our GitHub'}
                  />
                  . Also we will soon add a version of our frontend that you can
                  host yourself easily.
                </p>
              )}
              width={'auto'}
            />
            <Question
              title={style => (
                <h1 className={style}>What wallets are supported by Boltz?</h1>
              )}
              content={style => (
                <p className={style}>
                  All regular and Lightning wallets are supported by Boltz.
                  Although we encourage you to run a full node and manage your
                  own keys, there are custodial wallets solutions, like{' '}
                  <Link to={'https://bluewallet.io/'} text={'BlueWallet'} />,
                  that work out of the box can make testing Boltz very easy.
                </p>
              )}
            />
          </div>
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
