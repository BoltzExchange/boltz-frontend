import { generateKeys } from './keys';
import history from '../constants/history';
import Navigation from './navigation';

const navigation = new Navigation(history);
export { generateKeys, navigation };
