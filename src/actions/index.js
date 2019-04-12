import { generateKeys } from './keys';
import history from '../constants/history';
import Navigation from './navigation';
import * as landingPageActions from './landingPageActions';

const navigation = new Navigation(history);
export { generateKeys, landingPageActions, navigation };
