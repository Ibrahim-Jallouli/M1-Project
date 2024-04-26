import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notifications: string[] = [];
  private notificationAdded$ = new Subject<string>();

  constructor() {
    this.loadNotifications();
  }

  addNotification(message: string) {
    this.notifications.push(message);
    this.notificationAdded$.next(message);
    this.saveNotifications(); // Save notifications to localStorage whenever a new notification is added
  }

  getNotifications() {

    return this.notifications;
  }

  clearNotifications() {
    this.notifications = [];
    this.saveNotifications(); // Clear notifications from localStorage
  }

  getNotificationAddedObservable() {
    return this.notificationAdded$.asObservable();
  }

  private saveNotifications() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }

  private loadNotifications() {
    const savedNotifications = localStorage.getItem('notifications');
    this.notifications = savedNotifications ? JSON.parse(savedNotifications) : [];
  }

  removeNotification(index: number) {
    this.notifications.splice(index, 1); // Remove the notification at the specified index
    this.saveNotifications(); // Update localStorage with the new state
  }
  
}
