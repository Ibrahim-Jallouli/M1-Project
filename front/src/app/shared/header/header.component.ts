import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service'; 
import { NotificationsService } from 'src/app/services/notifications.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  buttonText: string = '';
  notifications: string[] = [];
  hasNewNotifications: boolean = false;
  email: string = "";
  token: string |null="";
  

  constructor(private router: Router,public authService: AuthService, private notificationsService: NotificationsService) { }

  ngOnInit() {
    // Load existing notifications from localStorage through the service
    this.notifications = this.notificationsService.getNotifications();
    this.hasNewNotifications = this.notifications.length > 0;

    // Subscribe to new notification additions to update UI accordingly
      this.notificationsService.getNotificationAddedObservable().subscribe({
      next: (message) => {
        this.notifications = this.notificationsService.getNotifications(); // Refresh the notifications list
        this.hasNewNotifications = true; 
      }
    });
    console.log(this.notifications);
    this.updateButtonText();

    // Subscribe to route events to update button text when route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateButtonText();
    });

  }

  redirectToAuthPage() {
    if (this.router.url === '/login') {
      this.router.navigate(['/signin']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  updateButtonText() {
    if (this.router.url === '/login') {
      this.buttonText = 'Sign In';
    } else {
      this.buttonText = 'Login';
    }
  }

  logout() {
    this.email=this.authService.getEmail();
    this.token = this.authService.getToken();
    this.authService.logout(this.email,this.token).subscribe({
      next: (response) => {
        console.log('Logout successful', response);
        this.router.navigate(['/login']);
        this.clearNotifications();
      },
      error: (error) => {
        console.error('Logout failed', error);
        // Handle error (e.g., show error message)
      }
    });
  }

  clearNotifications() {
    this.notificationsService.clearNotifications();
    this.notifications = [];
  }


  resetNewNotificationFlag() {
    this.hasNewNotifications = false;
  }


  removeNotification(index: number) {
    this.notificationsService.removeNotification(index);
    this.notifications = this.notificationsService.getNotifications(); // Refresh notifications list
  }
  
}
