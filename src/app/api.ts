import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get('https://dummyjson.com/products?limit=30');
  }

  getCategories(): Observable<any> {
    return this.http.get('https://dummyjson.com/products/category-list');
  }
}