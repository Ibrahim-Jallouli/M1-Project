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
  email = 'youssef.hannachi@gmail.com';
  password = 'youssef';
  hidePassword = true;

  constructor(private router: Router, private authService: AuthService,private notificationsService: NotificationsService) { }
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem("username", this.email.substring(0, this.email.indexOf('@')));
        const token = (response as any).token; // Type assertion
        localStorage.setItem("token", token);
        this.notificationsService.addNotification('Welcome! '+ localStorage.getItem("username") + ' you are now logged in');
        this.router.navigate(['/accueil']);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
  
}
