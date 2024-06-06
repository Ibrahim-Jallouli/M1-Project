import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/publicApi';
  private baseUrlSecure =  'http://localhost:8080/secureApi';
  private loginVariable: boolean = false;
  private tokenKey = 'token';
  private user: any = null;

  // Method to log in the user
  login(email: string, password: string): Observable<any> {
    const loginPayload = { email, password };
    this.loginVariable = true;
    return this.http.post(`${this.baseUrl}/auth/login`, loginPayload);
  }

  // Method to log out the user
  logout(email: string, token: string|null): Observable<any> {
    this.loginVariable = false;
    localStorage.removeItem('username');
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('cartItems');
    console.log("this is the email in the logout:", email);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrlSecure}/auth/logout`, { email }, { headers, responseType: 'text' as 'json' });
  }



  // Method to sign in the user
  signIn(email: string, password: string) {
    const signInPayload = { email, password };
    // return this.http.post('/api/signin', signInPayload); 
    return of({ success: true }); 
  }

  // Method to check if the user is logged in
  isLoggedIn() {
    return localStorage.getItem(this.tokenKey) !== null;
    // return this.loginVariable;
  }

  // Method to save the token and decode it
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.decodeToken(token);
  }

  // Method to get the token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Method to decode the token
  private decodeToken(token: string): void {
    this.user = jwtDecode(token);
  }

  // Method to get the user information from the token
  getUser(): any {
    if (!this.user) {
      const token = this.getToken();
      if (token) {
        this.decodeToken(token);
      }
    }
    return this.user;
  }

  getRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }


  getUserId(): string | null {
    const user = this.getUser();
    return user ? user.userId : null;
  }


  getCartId(): number {
    const user = this.getUser();
    return user ? user.cartId : null;
  }

  getEmail(): string {
    const user = this.getUser();
    return user ? user.sub: null;
  }
}
