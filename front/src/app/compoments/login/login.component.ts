import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  hidePassword = true;

  constructor(private router: Router, private authService: AuthService,private notificationsService: NotificationsService) { }
  
  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem("username", this.username);
        this.notificationsService.addNotification('Welcome! '+this.username);
        this.router.navigate(['/accueil']);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
  
}
