import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private baseUrl = 'http://localhost:8080/privateApi';

  constructor(private http: HttpClient) { }

  public addToCartAPI(cartItem: { quantity: number, cartId: number, productId: number }, token: string): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/cartItem/addToCart`, cartItem, { headers, responseType: 'text' });
}



  public getCartItemsAPI(cartId: number, token: string|null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/cart/allCartItems/${cartId}`, { headers });
  }
  
}
