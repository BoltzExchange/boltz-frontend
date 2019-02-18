import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../../components/view';
import Prompt from '../../components/prompt';
import Loading from '../../components/loading';
import Controls from '../../components/controls';
import Confetti from '../../components/confetti';
import BackGround from '../../components/background';
import StepsWizard from '../../components/stepswizard';
import { InputInvoice, SendTransaction, DownloadRefund } from './steps';

const styles = () => ({
  wrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Swap = ({
  classes,
  webln,
  setSwapInvoice,
  completeSwap,
  goHome,
  swapInfo,
  swapResponse,
  startSwap,
  swapStatus,
}) => {
  return (
    <BackGround>
      <Prompt />
      <View className={classes.wrapper}>
        <StepsWizard
          range={4}
          stage={1}
          id={swapResponse ? swapResponse.id : null}
          onExit={() => {
            if (window.confirm('Are you sure you want to exit')) {
              completeSwap();
              goHome();
            }
          }}
        >
          <StepsWizard.Steps>
            <StepsWizard.Step
              num={1}
              render={() => (
                <InputInvoice
                  swapInfo={swapInfo}
                  webln={webln}
                  onChange={setSwapInvoice}
                />
              )}
            />
            <StepsWizard.Step
              num={2}
              render={() => (
                <DownloadRefund
                  address={swapResponse.address}
                  currency={swapInfo.base}
                  redeemScript={swapResponse.redeemScript}
                  privateKey={swapInfo.keys.privateKey}
                  timeoutBlockHeight={swapResponse.timeoutBlockHeight}
                />
              )}
            />
            <StepsWizard.Step
              num={3}
              render={() => (
                <SendTransaction
                  swapInfo={swapInfo}
                  swapResponse={swapResponse}
                />
              )}
            />
            <StepsWizard.Step num={4} render={() => <Confetti />} />
          </StepsWizard.Steps>
          <StepsWizard.Controls>
            <StepsWizard.Control
              num={1}
              render={props => (
                <Controls
                  loading={swapStatus.error}
                  text={`Fee: 0 ${swapInfo.base}`}
                  loadingText={'Invalid invoice'}
                  onPress={() => {
                    startSwap(swapInfo, props.nextStage);
                  }}
                />
              )}
            />
            <StepsWizard.Control
              num={2}
              render={props => (
                <Controls
                  text={'I have downloaded the refund file'}
                  onPress={() => {
                    props.nextStage();
                  }}
                />
              )}
            />
            <StepsWizard.Control
              num={3}
              render={props => (
                <Controls
                  text={swapStatus.message}
                  loading={swapStatus.pending}
                  error={swapStatus.error}
                  errorText={swapStatus.message}
                  errorAction={() => startSwap(swapInfo, props.nextStage)}
                  loadingRender={() => <Loading />}
                  onPress={() => {
                    completeSwap();
                    props.nextStage();
                  }}
                />
              )}
            />
            <StepsWizard.Control
              num={4}
              render={() => (
                <Controls text={'Swap Again!'} onPress={() => goHome()} />
              )}
            />
          </StepsWizard.Controls>
        </StepsWizard>
      </View>
    </BackGround>
  );
};

Swap.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  goHome: PropTypes.func.isRequired,
  webln: PropTypes.object,
  swapInfo: PropTypes.object,
  swapResponse: PropTypes.object,
  completeSwap: PropTypes.func,
  setSwapInvoice: PropTypes.func,
  onExit: PropTypes.func,
  nextStage: PropTypes.func,
  startSwap: PropTypes.func.isRequired,
  swapStatus: PropTypes.string.isRequired,
};

export default injectSheet(styles)(Swap);
