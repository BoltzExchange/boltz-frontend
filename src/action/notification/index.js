import icon from '../../asset/icons/boltz_logo.png';

class NotificationManager {
  constructor() {
    this._notification = false;
  }

  init = () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
      this._notification = false;
    }

    if (window.Notification.permission === 'granted') {
      this._notification = true;
    }

    if (
      window.Notification.permission !== 'denied' ||
      window.Notification.permission === 'default'
    ) {
      window.Notification.requestPermission(permission => {
        if (permission === 'granted') {
          this._notification = true;
        }
      });
    }
  };

  spawnNotification = (
    title,
    body,
    lifeSpan = 5000,
    requireInteraction = false
  ) => {
    if (this._notification) {
      const n = new window.Notification(title, {
        body,
        image: icon,
        requireInteraction,
      });
      setTimeout(n.close.bind(n), lifeSpan);
    } else {
      window.alert(body);
    }
  };
}

export default NotificationManager;
