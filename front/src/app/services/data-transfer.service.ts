import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../entities/product';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private categorySelectedSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {}

  setSelectedCategory(categoryId: number) {
    this.categorySelectedSubject.next(categoryId);
  }

  getSelectedCategory(): Observable<number | null> {
    return this.categorySelectedSubject.asObservable();
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cartItems');
  }


}
