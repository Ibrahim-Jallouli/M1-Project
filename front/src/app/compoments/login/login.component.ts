import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = 'youssef.hannachi@gmail.com';
  password = 'youssef';
  hidePassword = true;

  
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private panierService: PanierService
  ) { }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        const token = (response as any).token; // Type assertion
        this.authService.setToken(token);
        localStorage.setItem("username", this.email.substring(0, this.email.indexOf('@')));
        this.notificationsService.addNotification("Welcome! " + localStorage.getItem("username")+ " you are now logged in.");

        if (!localStorage.getItem('cartItems')) {
          localStorage.setItem('cartItems', JSON.stringify([]));
        } else {
          localStorage.setItem('cartItems', JSON.stringify([]));
        }  
        
        console.log(this.authService.getEmail());

        this.panierService.getCartItemsAPI(this.authService.getCartId(),this.authService.getToken()).subscribe({
          next: (response) => {
            console.log('Cart Items:', response);
            localStorage.setItem('cartItems', JSON.stringify(response));
          },
          error: (error) => {
            console.error('Failed to get cart items', error);
          }
        });
        
        this.router.navigate(['/accueil']);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
