// category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../entities/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/publicApi'; 

  constructor(private http: HttpClient) {}

  getParentCategories(): Observable<any[]> {
    return this.http.get<Category[]>(this.baseUrl+'/categories/parentCategories');
  }

  getSubcategories(categoryId: number): Observable<any[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories/subCategories/${categoryId}`);
  }
}
