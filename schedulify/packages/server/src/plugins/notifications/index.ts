
import { Express } from 'express';
import { Plugin } from '../plugin.interface';
import NotificationService from './notification.service';

class NotificationsPlugin implements Plugin {
  name = 'Notifications Plugin';
  version = '1.0.0';
  public notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  init(app: Express) {
    console.log(`Plugin loaded: ${this.name} v${this.version}`);
  }
}

const notificationsPlugin = new NotificationsPlugin();

export default notificationsPlugin;
