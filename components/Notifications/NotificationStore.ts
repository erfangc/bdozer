import {Store} from "../../Store";

export interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  delay: number
}

class NotificationStore extends Store<Notification[]> {
  constructor(state: Notification[]) {
    super(state);
  }

  addNotification(notification: Notification) {
    this.setState([...this.getState(), notification]);
  }

  dismissNotification(id: string) {
    this.setState(this.getState().filter((e) => e.id !== id));
  }
}

export const notificationStore = new NotificationStore([]);
