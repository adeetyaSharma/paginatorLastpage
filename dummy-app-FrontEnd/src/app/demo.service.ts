import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  // Fetches a paginated list of products from the backend API
  getProducts(page: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get/${page}`);
  }

  // Fetches total count of entries in the products list from backend API
  getTotalCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}
