import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }
  private baseUrl = 'https://localhost:8080/publicApi'; 

  private loginVarible : boolean = false;

  login(email: string, password: string) {
    const loginPayload = { email, password };
    this.loginVarible = true;
    console.log('username', email);
    console.log('password', password);
    return this.http.post(this.baseUrl+'/auth/login', loginPayload)
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
    localStorage.removeItem('token');
  }
}
