import * as routes from '../../constants/routes';
import { NAVIGATE } from '../../constants/actions';

const navAction = nav => ({
  type: NAVIGATE,
  payload: nav,
});

class Navigation {
  constructor() {
    navAction.bind(this);
  }

  goHome = () => navAction(routes.home);

  goSwap = () => navAction(routes.swap);
  goReverseSwap = () => navAction(routes.reverseSwap);
  goSwapConfirm = () => navAction(routes.swapConfirm);
  goSwapDownloadRefund = () => navAction(routes.swapDownloadRefund);
  goSwapDone = () => navAction(routes.swapDone);

  goRefund = () => navAction(routes.refund);

  goFaq = () => navAction(routes.faq);
}

export default Navigation;
