import { generateKeys } from './keys';
import history from '../constants/history';
import Navigation from './navigation';
import NotificationManager from './notification';

export const notificationManager = new NotificationManager();
export const navigation = new Navigation(history);
export { generateKeys };
