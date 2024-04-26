import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private categorySelectedSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  constructor() {}

  setSelectedCategory(categoryId: number) {
    this.categorySelectedSubject.next(categoryId);
  }

  getSelectedCategory(): Observable<number | null> {
    return this.categorySelectedSubject.asObservable();
  }
}
