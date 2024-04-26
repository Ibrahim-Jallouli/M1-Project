import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  emailSignin: string = '';
  passwordSignin: string = '';
  verifyPasswordSignin: string = '';
  termsAccepted: boolean = false;
  isPasswordMatch: boolean = true;
  isEmailValid: boolean = true;

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
    verifyPassword: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private authService:AuthService) { }

  get email() { return this.signinForm.get('email'); }
  get password() { return this.signinForm.get('password'); }
  get verifyPassword() { return this.signinForm.get('verifyPassword'); }
  hidePassword = true; // Controls visibility of the password
  hideVerifyPassword = true;

  signIn() {
    // Call the signIn method from AuthService
    this.authService.signIn(this.emailSignin, this.passwordSignin).subscribe({
      next: (response) => {
        console.log('Sign In successful', response);
        this.router.navigate(['/login']); 
      },
      error: (error) => {
        console.error('Sign In failed', error);
      }
    });
  }
  

  toggleCheckbox() {
    // Implement the toggle functionality here
    this.termsAccepted = !this.termsAccepted;
  }
  
}
