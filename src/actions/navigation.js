import * as routes from '../constants/routes';

class Navigation {
  constructor(history) {
    this._history = history;
  }

  _push = route => {
    this._history.push(route);
  };

  navHome = () => {
    this._push(routes.home);
  };

  navFaq = () => {
    this._push(routes.faq);
  };

  navRefund = () => {
    this._push(routes.refund);
  };

  navSwap = () => {
    this._push(routes.swap);
  };

  navReverseSwap = () => {
    this._push(routes.reverseSwap);
  };

  navReverseExpired = () => {
    this._push(routes.reverseExpired);
  };
}

export default Navigation;
