import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }


  private loginVarible : boolean = false;

  login(username: string, password: string) {
    const loginPayload = { username, password };
    //return this.http.post('/api/login', loginPayload)
    this.loginVarible = true;
    return of(true); 
  }

  signIn(email: string, password: string) {
    const signInPayload = { email, password };
    //return this.http.post('/api/signin', signInPayload); 
    return of({ success: true }); 
  }

  isLoggedIn() {
    return localStorage.getItem('username') !== null 
    //return this.loginVarible;
  }

  logout() {
    this.loginVarible = false;
    localStorage.removeItem('username');
    
  }
}
