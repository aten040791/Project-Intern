import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService { 
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPostCategories(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/${categoryId}`);
  };

  fetchDataCategory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category`);
  }
}
