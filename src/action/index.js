import { generateKeys } from './keys';
import history from '../constants/history';
import Navigation from './navigation';

export const navigation = new Navigation(history);
export { generateKeys };
