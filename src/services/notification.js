export class Notification {
  constructor() {
    // window.document.addEventListener('DOMContentLoaded', function() {});
  }

  checkNotificationEnable() {
    return !!window.Notification;
  }

  checkNotificationGranted() {
    return window.Notification.permission === 'granted';
  }

  requestNotificationPermission() {
    return Notification.requestPermission();
  }

  notify(title, icon, body, fn) {
    const notification = new Notification(title, { icon, body });
    notification.onclick = fn;
  }
}

export default new Notification();
