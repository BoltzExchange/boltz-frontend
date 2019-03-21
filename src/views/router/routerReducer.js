import * as routes from '../../constants/routes';
import { NAVIGATE } from '../../constants/actions';

const initalState = routes.home;

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case NAVIGATE:
      if (state !== action.payload) {
        return action.payload;
      }
      return state;

    default:
      return state;
  }
};

export default reducer;
