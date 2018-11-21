import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import qr from '../../asset/icons/qr_code.png';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import Background from '../../components/background';
import View from '../../components/view';
import { LinkButton } from '../../components/button';
import TaskBar from '../../components/taskbar';
import SwapTab from '../../components/swaptab';
import StepsWizard from '../../components/stepswizard';

const styles = theme => ({
  wrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  infoWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSize.sizeXXL,
    color: theme.colors.white,
  },
  description: {
    fontSize: theme.fontSize.sizeXXL,
  },
});

//TODO: refactor into multipe components.
const InvoiceStep = () => (
  <View
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <p style={{ fontSize: '30px' }}>
      Paste a <b>Bitcoin</b> lightning invoice of <br /> <b>0.0049 T-BTC</b> to
      recieve it.
    </p>
    <p
      style={{
        padding: '50px',
        wordBreak: 'break-all',
        whiteSpace: 'normal',
        width: '600px',
        height: '100px',
        color: '#505050',
        fontSize: '18px',
        backgroundColor: '#D3D3D3',
        borderRadius: '3px',
      }}
    >
      lnbc1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdpl2pkx2ctnv5
      sxxmmwwd5kgetjypeh2ursdae8g6twvus8g6rfwvs8qun0dfjkxaq8rkx3yf5tcsyz3d73gafnh3cax
      9rn449d9p5uxz9ezhhypd0elx87sjle52x86fux2ypatgddc6k63n7erqz25le42c4u4ecky03ylcqca784w
    </p>
  </View>
);

const QrStep = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={qr}
        style={{
          width: '300px',
          height: '300px',
        }}
        alt={'qr code'}
      />
    </View>
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-around',
      }}
    >
      <p
        style={{
          fontSize: '30px',
        }}
      >
        Send <b>0.005 T-BTC</b> <br />
        on <b>Bitcoin</b> <br />
        blockchain address:
      </p>
      <p
        style={{
          fontSize: '28px',
          color: 'grey',
        }}
      >
        1F1tAaz5x1HUXrCNLbt
        <br />
        MDqcw6o5GNn4xqX
      </p>
      <span
        style={{
          color: 'blue',
          fontWeight: '600',
          fontSize: '30px',
          marginLeft: '50%',
        }}
      >
        Copy
      </span>
    </View>
  </View>
);

const WaitingForTx = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <p
      style={{
        fontSize: '30px',
      }}
    >
      Waiting for one confirmation on Blockchain
      <br /> address:
      <a
        style={{
          fontSize: '24px',
        }}
        href={
          'https://www.blockchain.com/btc/address/1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX'
        }
      >
        1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX
      </a>
    </p>
  </View>
);

const Complete = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <FaCheckCircle size={240} color="lightgreen" />
    <span
      style={{
        margin: '15px',
        fontSize: '30px',
      }}
    >
      Success!
    </span>
  </View>
);

const Controls = ({ text }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h1 style={{ color: '#fff', fontWeight: '300' }}>{text}</h1>
    <FaArrowRight
      size={20}
      color={'#FFF'}
      style={{
        margin: '10px',
      }}
    />
  </View>
);

Controls.propTypes = {
  text: PropTypes.string,
};

const Swap = ({ classes, inSwapMode, toggleSwapMode }) => {
  return (
    <Background>
      <TaskBar />
      {inSwapMode ? (
        <View className={classes.wrapper}>
          <StepsWizard
            range={4}
            stage={1}
            onExit={() => toggleSwapMode()}
            alertOnExit={inSwapMode}
            // TODO: change state isSwapMode
            message={'Are you sure?'}
          >
            <StepsWizard.Steps>
              <StepsWizard.Step num={1} render={() => <InvoiceStep />} />
              <StepsWizard.Step num={2} render={() => <QrStep />} />
              <StepsWizard.Step num={3} render={() => <WaitingForTx />} />
              <StepsWizard.Step num={4} render={() => <Complete />} />
            </StepsWizard.Steps>
            <StepsWizard.Controls>
              <StepsWizard.Control
                num={1}
                render={() => <Controls text={'Fee: 0.0001 T-BTC'} />}
              />
              <StepsWizard.Control
                num={2}
                render={() => <Controls text={'Send'} />}
              />
              <StepsWizard.Control
                num={3}
                render={() => <Controls text={'Download refund JSON'} />}
              />
              <StepsWizard.Control
                num={4}
                render={() => <Controls text={'Download refund JSON'} />}
              />
            </StepsWizard.Controls>
          </StepsWizard>
        </View>
      ) : (
        <View className={classes.wrapper}>
          <View className={classes.infoWrapper}>
            <p className={classes.title}>
              Instant, Low fee, & <br /> Non custodial.
            </p>
            <p className={classes.description}>
              Trading <br />
              <b>{`Shouldn't`}</b>
              <br />
              require
              <br />
              an account.
            </p>
            <LinkButton text="WHY?" to="/faq" />
          </View>
          <SwapTab onClick={() => toggleSwapMode()} />
        </View>
      )}
    </Background>
  );
};

Swap.propTypes = {
  classes: PropTypes.object,
  inSwapMode: PropTypes.bool,
  toggleSwapMode: PropTypes.func,
};

export default injectSheet(styles)(Swap);
